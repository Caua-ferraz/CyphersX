# Next.js + Supabase SaaS Boilerplate

This boilerplate provides a solid foundation for building modern SaaS applications using Next.js, Supabase, and other powerful technologies.

## Features

- **Next.js 14**: Utilizing the latest features of Next.js for optimal performance and developer experience.
- **Supabase Integration**: For authentication and database management.
- **Stripe Integration**: Ready-to-use payment system for your SaaS.
- **TanStack Query**: For efficient server state management.
- **Tailwind CSS**: For rapid and responsive UI development.
- **Shadcn UI**: Pre-built accessible and customizable UI components.
- **Dark Mode Support**: Built-in theme switching capabilities.
- **SEO Optimized**: Includes a reusable SEO component for better search engine visibility.
- **Responsive Design**: Mobile-first approach ensuring great UX across all devices.
- **TypeScript**: For type-safe code and enhanced developer productivity.
- **Vercel Analytics**: Integrated analytics for monitoring performance.
- **Documentation**: Comprehensive documentation for key components and features.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Caua-ferraz/BilQuick_Boilerplate.git
   cd next-supabase-saas-boilerplate
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in your Supabase and Stripe credentials

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

- `/app`: Next.js app router pages and layouts
- `/components`: Reusable React components
- `/lib`: Utility functions and shared logic
- `/public`: Static assets and documentation
- `/styles`: Global styles and Tailwind CSS configuration
- `/types`: TypeScript type definitions
- `/hooks`: Custom React hooks

### Folder Structure
```
.
├── app/
│ ├── api/
│ │ ├── docs/
│ │ │ └── route.ts
│ │ └── docs-list/
│ │ └── route.ts
│ ├── documentation/
│ │ └── page.tsx
│ ├── hook/
│ │ └── useUser.ts
│ ├── privacity/
│ │ └── page.tsx
│ ├── success/
│ │ └── page.tsx
│ ├── terms/
│ │ └── page.tsx
│ ├── globals.css
│ ├── layout.tsx
│ └── page.tsx
├── components/
│ ├── subscription/
│ │ └── price.tsx
│ ├── ui/
│ │ ├── button.tsx
│ │ ├── card.tsx
│ │ ├── carousel.tsx
│ │ └── video.tsx
│ ├── Navbar.tsx
│ ├── SEO.tsx
│ ├── cta.tsx
│ ├── fadein.tsx
│ ├── query-provider.tsx
│ ├── theme-provider.tsx
│ └── TypingTitle.tsx
├── lib/
│ └── utils.ts
├── public/
│ ├── docs/
│ │ ├── index.md
│ │ ├── seo_documentation.md
│ │ ├── stripe_integration.md
│ │ └── TypingTitle.md
│ └── vercel.svg
├── styles/
│ └── globals.css
├── types/
│ └── index.ts
├── .env.example
├── .eslintrc.json
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```
## Key Components

- `SEO.tsx`: Customizable SEO component for better search engine optimization
- `TypingTitle.tsx`: Animated typing effect for headings
- `ThemeProvider.tsx`: Manages application-wide theming
- `QueryProvider.tsx`: Sets up React Query for the application
- `Navbar.tsx`: Responsive navigation component
- `Price.tsx`: Dynamic pricing component with Stripe integration
- `Documentation.tsx`: Component for rendering markdown documentation

## Customization

- Tailwind CSS: Customize the `tailwind.config.js` file to match your brand colors and styling preferences.
- Components: Modify or extend the components in the `/components` directory to fit your specific needs.
- SEO: Update the default metadata in `components/SEO.tsx` to reflect your SaaS details.

## Supabase Setup

To set up Supabase for local development and production:

1. Create a Supabase project at [https://supabase.com](https://supabase.com)
2. Follow the Supabase CLI guide for local development: [Supabase Local Development](https://supabase.com/docs/guides/cli/local-development)
3. Use the provided migration scripts to set up your database schema

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API.
- [Supabase Documentation](https://supabase.com/docs) - Learn about Supabase features and API.
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework.
- [TanStack Query](https://tanstack.com/query/latest/) - Powerful asynchronous state management.
- [Shadcn UI](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind CSS.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Documentation

We've added comprehensive documentation for key components and features. You can find these in the `/public/docs` directory. To view the documentation:

1. Start your development server
2. Navigate to `/documentation` in your browser
3. Use the sidebar to browse different documentation pages

Key documentation files include:
- `SEO_documentation.md`: Guide for using and customizing the SEO component
- `TypingTitle.md`: Instructions for the animated typing effect component
- `stripe_integration.md`: Details on setting up and using Stripe for payments

## Analytics

This project includes Vercel Analytics for monitoring performance and user behavior. To view analytics:

1. Deploy your project to Vercel
2. Go to your Vercel dashboard
3. Navigate to the "Analytics" tab for your project

Remember to comply with necessary data protection regulations when collecting user data.
