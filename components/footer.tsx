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
					"mx-auto max-w-5xl lg:border-x",
					"dark:bg-[radial-gradient(35%_80%_at_30%_0%,--theme(--color-foreground/.1),transparent)]"
				)}
			>
				<div className="absolute inset-x-0 h-px w-full bg-border" />
				<div className="grid max-w-5xl grid-cols-6 gap-6 p-4">
					<div className="col-span-6 flex flex-col gap-4 pt-5 md:col-span-4">
						<a className="w-max" href="#">
							<button
								onClick={() => scrollToSection("hero")}
								data-cursor="HOME"
								className="font-medium text-foreground text-sm transition-opacity duration-200 hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
							>
								JS
							</button>
						</a>
						<p className="max-w-sm text-balance font-mono text-muted-foreground text-sm">
							Open for opportunities and collaboration.
						</p>
						<div className="flex gap-2">
							{socialLinks.map((item, index) => (
								<Button
									key={`social-${item.link}-${index}`}
									size="icon-sm"
									variant="outline"
								>
									<a href={item.link} target="_blank" rel="noreferrer">
										<item.icon className="size-3.5" />
									</a>
								</Button>
							))}
						</div>
					</div>
					<div className="col-span-3 w-full md:col-span-1">
						<span className="text-muted-foreground text-xs">Links</span>
						<div className="mt-2 flex flex-col gap-2">
							{links.map(({ section, title }) => (
								<button
									data-cursor="SCROLL"
									className="w-max text-left text-sm hover:underline"
									onClick={() => scrollToSection(section)}
									key={title}
								>
									{title}
								</button>
							))}
						</div>
					</div>
					<div className="col-span-3 w-full md:col-span-1">
						<span className="text-muted-foreground text-xs">Resources</span>
						<div className="mt-2 flex flex-col gap-2">
							{resources.map(({ href, title }) => (
								<a
									data-cursor="OPEN"
									className="w-max text-sm hover:underline"
									href={href}
									key={title}
								>
									{title}
								</a>
							))}
						</div>
					</div>
				</div>
				<div className="absolute inset-x-0 h-px w-full bg-border" />
				<div className="flex max-w-4xl flex-col justify-between gap-2 py-4">
					<p className="text-center font-light text-muted-foreground text-sm">
						&copy; {new Date().getFullYear()} Jashanpreet Singh, All rights reserved
					</p>
				</div>
			</div>
		</footer>
	);
}
