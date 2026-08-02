import { Link } from 'react-router-dom';
import { SeoHead } from '@/features/seo/SeoHead';

export function NotFoundPage() {
  return (
    <>
      <SeoHead title="404 — Page Not Found" description="The requested developer tool or resource could not be found on Velomint." noindex />
      <div className="py-20 text-center max-w-md mx-auto">
        <span className="badge badge-neutral mb-4">404 Error</span>
        <h1 className="font-display text-4xl font-bold text-foreground tracking-tight">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-muted mt-3 leading-relaxed">
          The requested path or tool URL does not exist or has been moved.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link to="/" className="btn-primary text-xs py-2 px-4">
            Return Home
          </Link>
          <Link to="/tools" className="btn-secondary text-xs py-2 px-4">
            Browse All Tools
          </Link>
        </div>
      </div>
    </>
  );
}
