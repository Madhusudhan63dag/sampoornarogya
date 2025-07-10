import { getAllBlogSlugs } from '../../../lib/blogData';
import BlogPostClient from './BlogPostClient';

// Generate static params for all blog posts using slugs
export async function generateStaticParams() {
  return getAllBlogSlugs();
}

export default function BlogPost({ params }) {
  return <BlogPostClient params={params} />;
}
