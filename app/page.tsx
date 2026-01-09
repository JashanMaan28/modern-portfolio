import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { GitHubSection } from "@/components/github-section"
import { CertificatesSection } from "@/components/certificates-section"
import { ContactCard } from "@/components/contact-card"
import { Navigation } from "@/components/navigation"
import { SmartCursor } from "@/components/smart-cursor"
import { cn } from "@/lib/utils"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen text-foreground">
      <SmartCursor />
      <Navigation />
      <div
        className={cn(
          "mx-auto max-w-5xl lg:border-x border-border",
          "dark:bg-[radial-gradient(35%_80%_at_30%_0%,rgba(255,255,255,0.05),transparent),radial-gradient(35%_80%_at_70%_100%,rgba(255,255,255,0.03),transparent)]",
        )}
      >
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <GitHubSection />
        <CertificatesSection />
        <ContactCard
          id="contact"
          className="scroll-mt-24"
					contactInfo={[
						{
							icon: MailIcon,
							label: "Email",
							value: "jmaan1337@gmail.com",
						},
						{
							icon: PhoneIcon,
							label: "Phone",
							value: "+1 (209) 607-4130",
						},
						{
							icon: MapPinIcon,
							label: "Address",
							value: "Manteca, California",
							className: "col-span-2",
						},
					]}
					description="If you have any questions or need help, please fill out the form here. I will do my best to respond as soon as possible."
					title="Get in touch"
				>
					<form action="" className="w-full space-y-4">
						<div className="flex flex-col gap-2">
							<Label>Name</Label>
							<Input type="text" />
						</div>
						<div className="flex flex-col gap-2">
							<Label>Email</Label>
							<Input type="email" />
						</div>
						<div className="flex flex-col gap-2">
							<Label>Phone</Label>
							<Input type="phone" />
						</div>
						<div className="flex flex-col gap-2">
							<Label>Message</Label>
							<Textarea />
						</div>
						<Button className="w-full" type="button">
							Submit
						</Button>
					</form>
				</ContactCard>
        <Footer />
      </div>
    </main>
  )
}
