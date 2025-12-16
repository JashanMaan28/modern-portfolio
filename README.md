# Modern Portfolio

A modern, responsive, and interactive portfolio website built with Next.js 16, Tailwind CSS, and Shadcn UI. This project showcases my skills, projects, and GitHub contributions in a sleek and professional manner.

## Features

- **Modern Tech Stack**: Built with the latest Next.js 16 (App Router) and React Server Components.
- **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices.
- **Interactive UI**:
  - Custom smart cursor for enhanced user experience.
  - Smooth scrolling and section reveal animations.
  - Interactive components using Radix UI and Shadcn UI.
- **GitHub Integration**: Real-time GitHub contribution graph powered by GitHub GraphQL API.
- **Sections**:
  - **Hero**: Introduction and call to action.
  - **About**: Professional summary.
  - **Projects**: Showcase of featured projects.
  - **Skills**: Display of technical expertise.
  - **Certificates**: Professional certifications.
  - **Contact**: Contact information and form.
- **Theming**: Dark mode support (configurable).

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: Custom CSS and React hooks.
- **Deployment**: Vercel (recommended).

## Getting Started

### Prerequisites

- Node.js 18+ installed.
- A GitHub Personal Access Token (for the contributions graph).

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/JashanMaan28/modern-portfolio.git
   cd modern-portfolio
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup:**

   Create a `.env` file in the root directory and add your GitHub token:

   ```env
   GITHUB_TOKEN=your_github_personal_access_token
   ```

   > **Note:** The token needs `read:user` scope to fetch contribution data.

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/                  # Next.js App Router pages and API routes
│   ├── api/              # API routes (e.g., GitHub contributions)
│   ├── globals.css       # Global styles and Tailwind directives
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main landing page
├── components/           # React components
│   ├── ui/               # Reusable UI components (Shadcn)
│   └── ...               # Section-specific components (Hero, About, etc.)
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── public/               # Static assets
```

## Customization

- **Personal Info**: Update `app/page.tsx` and individual section components in `components/` with your own data.
- **GitHub Username**: Update the default username in `app/api/github/contributions/route.ts` or pass it as a query parameter.
- **Styling**: Modify `app/globals.css` or `tailwind.config.ts` to change the theme and colors.

## License

This project is licensed under the MIT License.
