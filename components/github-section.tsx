"use client"

import { useState, useEffect } from "react"
import { useSectionReveal } from "@/hooks/use-section-reveal"
import { AnimatedLine } from "@/components/animated-line"

interface ContributionDay {
  date: string
  contributionCount: number
  color: string
}

interface GitHubData {
  totalContributions: number
  contributions: ContributionDay[]
}

export function GitHubSection() {
  const { ref, isVisible } = useSectionReveal()
  const [hoveredCell, setHoveredCell] = useState<number | null>(null)
  const [graphVisible, setGraphVisible] = useState(false)
  const [githubData, setGithubData] = useState<GitHubData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch GitHub contributions
  useEffect(() => {
    async function fetchContributions() {
      try {
        setLoading(true)
        const response = await fetch('/api/github/contributions?username=JashanMaan28')
        
        if (!response.ok) {
          throw new Error('Failed to fetch contributions')
        }
        
        const data = await response.json()
        setGithubData(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching GitHub data:', err)
        setError('Failed to load GitHub data')
      } finally {
        setLoading(false)
      }
    }

    fetchContributions()
  }, [])

  useEffect(() => {
    if (isVisible && !loading) {
      const timer = setTimeout(() => setGraphVisible(true), 300)
      return () => clearTimeout(timer)
    }
  }, [isVisible, loading])

  const getCellColor = (count: number) => {
    if (count === 0) return "bg-muted/50"
    if (count < 3) return "bg-emerald-700/60"
    if (count < 6) return "bg-emerald-600/80"
    return "bg-emerald-500"
  }

  const getContributionText = (contribution: ContributionDay) => {
    const count = contribution.contributionCount
    if (count === 0) return "No contributions"
    if (count === 1) return "1 contribution"
    return `${count} contributions`
  }

  // Get last 364 days of contributions (52 weeks)
  const contributions = githubData?.contributions.slice(-364) || []

  return (
    <section ref={ref} id="github" className="relative">
      <div className="grid grid-cols-6 gap-6 p-4">
        <div
          className={`col-span-6 md:col-span-2 pt-4 transition-all duration-500 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"
          }`}
        >
          <span className="text-muted-foreground text-xs uppercase tracking-widest">GitHub Activity</span>
        </div>
        <div className="col-span-6 md:col-span-4 py-4">
          <div
            data-cursor="GITHUB"
            className={`rounded-md border border-border p-4 bg-card/30 transition-all duration-500 ease-out hover:bg-card/50 hover:border-muted-foreground/30 focus-within:ring-2 focus-within:ring-ring ${
              graphVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center h-24">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-24 text-muted-foreground">
                {error}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-[repeat(26,1fr)] gap-0.5 md:grid-cols-[repeat(52,1fr)]">
                  {contributions.map((contribution, i) => (
                    <div
                      key={contribution.date}
                      onMouseEnter={() => setHoveredCell(i)}
                      onMouseLeave={() => setHoveredCell(null)}
                      className={`aspect-square rounded-sm cursor-pointer
                        transition-all duration-200 ease-out
                        ${getCellColor(contribution.contributionCount)}
                        ${hoveredCell === i ? "scale-150 z-10 ring-1 ring-foreground/20" : ""}
                        ${graphVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"}
                      `}
                      style={{
                        transitionDelay: graphVisible ? `${Math.floor(i / 7) * 2}ms` : "0ms",
                      }}
                      title={`${contribution.date}: ${contribution.contributionCount} contributions`}
                    />
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span className={`transition-opacity duration-300 ${graphVisible ? "opacity-100" : "opacity-0"}`}>
                    {githubData && `${githubData.totalContributions} contributions in the last year`}
                  </span>
                  <span
                    className={`font-mono transition-all duration-150 ${
                      hoveredCell !== null ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
                    }`}
                  >
                    {hoveredCell !== null && contributions[hoveredCell] && getContributionText(contributions[hoveredCell])}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <AnimatedLine progress={0.7} />
    </section>
  )
}
