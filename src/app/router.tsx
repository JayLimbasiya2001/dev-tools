/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { HomePage } from '@/pages/HomePage';
import { ToolCardSkeleton } from '@/components/ui/Skeleton';

const ToolsPage = lazy(() => import('@/pages/ToolsPage').then((m) => ({ default: m.ToolsPage })));
const ToolPage = lazy(() => import('@/pages/ToolPage').then((m) => ({ default: m.ToolPage })));
const CategoriesPage = lazy(() => import('@/pages/CategoriesPage').then((m) => ({ default: m.CategoriesPage })));
const CategoryPage = lazy(() => import('@/pages/CategoryPage').then((m) => ({ default: m.CategoryPage })));
const AboutPage = lazy(() => import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const PrivacyPage = lazy(() => import('@/pages/LegalPage').then((m) => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('@/pages/LegalPage').then((m) => ({ default: m.TermsPage })));
const BlogPage = lazy(() => import('@/pages/BlogPage').then((m) => ({ default: m.BlogPage })));
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage').then((m) => ({ default: m.BlogPostPage })));
const BlogCategoryPage = lazy(() => import('@/pages/BlogCategoryPage').then((m) => ({ default: m.BlogCategoryPage })));
const BlogTagPage = lazy(() => import('@/pages/BlogTagPage').then((m) => ({ default: m.BlogTagPage })));
const BlogIdeasPage = lazy(() => import('@/pages/BlogIdeasPage').then((m) => ({ default: m.BlogIdeasPage })));
const ChangelogPage = lazy(() => import('@/pages/ChangelogPage').then((m) => ({ default: m.ChangelogPage })));

const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

function Lazy({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }, (_, i) => <ToolCardSkeleton key={i} />)}</div>}>
      {children}
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'tools', element: <Lazy><ToolsPage /></Lazy> },
      { path: 'tools/:slug', element: <Lazy><ToolPage /></Lazy> },
      { path: 'categories', element: <Lazy><CategoriesPage /></Lazy> },
      { path: 'categories/:id', element: <Lazy><CategoryPage /></Lazy> },
      { path: 'json-tools', element: <Lazy><CategoryPage /></Lazy> },
      { path: 'jwt-tools', element: <Lazy><CategoryPage /></Lazy> },
      { path: 'encoding-tools', element: <Lazy><CategoryPage /></Lazy> },
      { path: 'hash-tools', element: <Lazy><CategoryPage /></Lazy> },
      { path: 'regex-tools', element: <Lazy><CategoryPage /></Lazy> },
      { path: 'uuid-tools', element: <Lazy><CategoryPage /></Lazy> },
      { path: 'sql-tools', element: <Lazy><CategoryPage /></Lazy> },
      { path: 'html-tools', element: <Lazy><CategoryPage /></Lazy> },
      { path: 'css-tools', element: <Lazy><CategoryPage /></Lazy> },
      { path: 'xml-tools', element: <Lazy><CategoryPage /></Lazy> },
      { path: 'yaml-tools', element: <Lazy><CategoryPage /></Lazy> },
      { path: 'about', element: <Lazy><AboutPage /></Lazy> },
      { path: 'contact', element: <Lazy><ContactPage /></Lazy> },
      { path: 'privacy', element: <Lazy><PrivacyPage /></Lazy> },
      { path: 'terms', element: <Lazy><TermsPage /></Lazy> },
      { path: 'blog', element: <Lazy><BlogPage /></Lazy> },
      { path: 'blog/ideas', element: <Lazy><BlogIdeasPage /></Lazy> },
      { path: 'blog/category/:id', element: <Lazy><BlogCategoryPage /></Lazy> },
      { path: 'blog/tag/:tag', element: <Lazy><BlogTagPage /></Lazy> },
      { path: 'blog/:slug', element: <Lazy><BlogPostPage /></Lazy> },
      { path: 'changelog', element: <Lazy><ChangelogPage /></Lazy> },
      { path: ':slug', element: <Lazy><ToolPage /></Lazy> },
      { path: '*', element: <Lazy><NotFoundPage /></Lazy> },
    ],
  },
]);
