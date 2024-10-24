# SEO Component Documentation

The SEO component is designed to generate metadata for your Next.js pages, improving search engine optimization and social media sharing.

## How it works

The `generateMetadata` function creates a metadata object compatible with Next.js, including:
- Basic SEO tags (title, description, keywords)
- Open Graph tags for social media sharing
- Twitter Card tags for Twitter sharing
- Favicon

## Usage

1. Import the `generateMetadata` function in your page file:

```typescript
import { generateMetadata } from '@/components/SEO';
```

2. Use the function to generate metadata for your page:

```typescript
export const metadata = generateMetadata({
  title: "My Page Title",
  description: "A brief description of my page",
  keywords: "relevant, keywords, for, this, page",
});
```

3. For dynamic metadata, use Next.js's `generateMetadata` function:

```typescript
export async function generateMetadata({ params }: any) {
  // Fetch data if needed
  const data = await fetchSomeData(params.id);
  
  return generateMetadata({
    title: data.title,
    description: data.description,
    // ... other properties
  });
}
```

## Customization

### Default Values

You can modify the default values in the `defaultMeta` object within the SEO component:

```typescript
const defaultMeta = {
  title: 'Your SaaS Name - Transform Your Workflow',
  description: 'Your SaaS Name helps you streamline tasks, boost productivity, and achieve more in less time.',
  keywords: 'saas, software, productivity, workflow, task management',
  ogImage: '/og-image.png',
  ogType: 'website' as const,
  twitterCard: 'summary_large_image' as const,
};
```

### Custom Open Graph Image

Ensure you add your Open Graph image to the `public` folder and update the `ogImage` path accordingly.

### Supported Properties

The `SEOProps` interface defines the properties you can customize:

- `title`: The page title
- `description`: A brief description of the page content
- `keywords`: Relevant keywords for the page
- `ogImage`: The URL of the Open Graph image
- `ogType`: The type of the page ('website', 'article', 'book', or 'profile')
- `twitterCard`: The Twitter card type ('summary', 'summary_large_image', 'app', or 'player')

## Best Practices

1. Provide unique titles and descriptions for each page.
2. Keep descriptions concise (around 150-160 characters).
3. Use relevant keywords naturally in your content.
4. Provide high-quality, relevant Open Graph images for better social media sharing.

## Example Implementation

Here's an example of how to use the SEO component in a page:

```typescript
import { generateMetadata } from '@/components/SEO';

export const metadata = generateMetadata({
  title: "Your SaaS Name - Streamline Your Invoicing",
  description: "Your SaaS Name helps freelancers and small businesses create professional invoices, track payments, and get paid faster.",
  keywords: "invoicing, billing, freelance, small business, payment tracking",
  ogImage: "/images/your-og-image.png",
});

export default function InvoicingPage() {
  // Your page component code here
}
```

Remember to adjust the metadata for each page to accurately reflect its content and purpose.