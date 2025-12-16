import { NextResponse } from 'next/server'

interface ContributionDay {
  date: string
  contributionCount: number
  color: string
}

interface GitHubContributionResponse {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number
          weeks: Array<{
            contributionDays: Array<{
              contributionCount: number
              date: string
              color: string
            }>
          }>
        }
      }
    }
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username') || 'JashanMaan28'
  
  const token = process.env.GITHUB_TOKEN
  
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                color
              }
            }
          }
        }
      }
    }
  `

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      next: { revalidate: 3600 } // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const data: GitHubContributionResponse = await response.json()
    
    if (!data.data?.user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const contributionCalendar = data.data.user.contributionsCollection.contributionCalendar
    
    // Flatten the weeks into a single array of days
    const contributions: ContributionDay[] = contributionCalendar.weeks.flatMap(
      week => week.contributionDays
    )

    return NextResponse.json({
      totalContributions: contributionCalendar.totalContributions,
      contributions: contributions,
    })
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch GitHub contributions' },
      { status: 500 }
    )
  }
}
