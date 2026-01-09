"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
	GithubIcon,
	InstagramIcon,
	LinkedinIcon,
	TwitterIcon,
} from "lucide-react";

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export function Footer() {
	const resources = [
		{
			title: "Resume",
			href: "#",
		},
		{
			title: "Blog",
			href: "#",
		},
	];

	const links = [
		{
			title: "Projects",
			section: "projects",
		},
		{
			title: "Skills",
			section: "skills",
		},
		{
			title: "Awards",
			section: "certificates",
		},
		{
			title: "Contact",
			section: "contact",
		},
	];

	const socialLinks = [
		{
			icon: GithubIcon,
			link: "https://github.com/JashanMaan28",
		},
		{
			icon: InstagramIcon,
			link: "https://instagram.com/jshn_maan28",
		},
		{
			icon: LinkedinIcon,
			link: "https://www.linkedin.com/in/jashanpreet-singh28",
		},
		{
			icon: TwitterIcon,
			link: "https://x.com/JashanMaan28",
		},
	];
	
	return (
		<footer className="relative">
			<div
				className={cn(
					"mx-auto max-w-5xl lg:border-x border-border",
					"dark:bg-[radial-gradient(35%_80%_at_30%_0%,var(--foreground)/.05,transparent)]"
				)}
			>
				<div className="absolute left-1/2 -translate-x-1/2 top-0 h-px bg-border pointer-events-none -z-10" style={{ width: "100vw" }} />
				<div className="grid grid-cols-6 gap-6 p-4">
					<div className="col-span-6 md:col-span-4 flex flex-col gap-4 py-4">
						<button
							onClick={() => scrollToSection("hero")}
							data-cursor="HOME"
							className="w-max text-sm font-medium text-foreground transition-opacity duration-200 ease-out hover:opacity-70 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
						>
							JS
						</button>
						<p className="max-w-sm text-sm font-mono text-muted-foreground text-balance">
							Open for opportunities and collaboration.
						</p>
						<div className="flex gap-2">
							{socialLinks.map((item, index) => (
								<Button
									key={`social-${item.link}-${index}`}
									size="icon-sm"
									variant="outline"
									asChild
								>
									<a href={item.link} target="_blank" rel="noreferrer">
										<item.icon className="size-3.5" />
									</a>
								</Button>
							))}
						</div>
					</div>
					<div className="col-span-3 md:col-span-1 w-full py-4">
						<span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Links</span>
						<div className="mt-2 flex flex-col gap-2">
							{links.map(({ section, title }) => (
								<button
									data-cursor="SCROLL"
									className="w-max text-left text-sm transition-colors duration-200 ease-out hover:text-foreground hover:underline text-muted-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
									onClick={() => scrollToSection(section)}
									key={title}
								>
									{title}
								</button>
							))}
						</div>
					</div>
					<div className="col-span-3 md:col-span-1 w-full py-4">
						<span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Resources</span>
						<div className="mt-2 flex flex-col gap-2">
							{resources.map(({ href, title }) => (
								<a
									data-cursor="OPEN"
									className="w-max text-sm transition-colors duration-200 ease-out hover:text-foreground hover:underline text-muted-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
									href={href}
									key={title}
								>
									{title}
								</a>
							))}
						</div>
					</div>
				</div>
				<div className="absolute left-1/2 -translate-x-1/2 h-px bg-border pointer-events-none" style={{ width: "100vw" }} />
				<div className="flex flex-col justify-between gap-2 py-4 px-4">
					<p className="text-center text-sm text-muted-foreground">
						&copy; {new Date().getFullYear()} Jashanpreet Singh, All rights reserved
					</p>
				</div>
			</div>
		</footer>
	);
}
