import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SeoHead } from '@/features/seo/SeoHead';
import { toast } from '@/stores/toastStore';
import { BRAND } from '@/config/brand';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

export function ContactPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = () => {
    toast.success('Message received. We will respond within 24 hours.');
    reset();
  };

  return (
    <>
      <SeoHead title="Contact Support & Feedback" description={`Contact the ${BRAND.name} engineering team.`} path="/contact" />
      <div className="max-w-xl py-6">
        <span className="badge badge-neutral mb-3">Contact Support</span>
        <h1 className="font-display text-3xl font-bold text-foreground tracking-tight">
          Get in Touch
        </h1>
        <p className="text-xs sm:text-sm text-muted mt-2 mb-8 leading-relaxed">
          Have a bug report, feature suggestion, or security query? Reach out directly to <a href={`mailto:${BRAND.email}`} className="text-accent hover:underline">{BRAND.email}</a> or submit the form below.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="surface-card p-6 space-y-4">
          <div>
            <label htmlFor="name" className="text-xs font-medium text-foreground">Name</label>
            <input id="name" {...register('name')} className="input-field mt-1 text-xs" placeholder="Your name" />
            {errors.name && <p className="text-red-400 text-[11px] mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="text-xs font-medium text-foreground">Email Address</label>
            <input id="email" type="email" {...register('email')} className="input-field mt-1 text-xs" placeholder="you@company.com" />
            {errors.email && <p className="text-red-400 text-[11px] mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="message" className="text-xs font-medium text-foreground">Message</label>
            <textarea id="message" {...register('message')} rows={5} className="input-field mt-1 text-xs" placeholder="How can we help?" />
            {errors.message && <p className="text-red-400 text-[11px] mt-1">{errors.message.message}</p>}
          </div>

          <button type="submit" className="btn-primary w-full text-xs py-2.5">
            Send Message
          </button>
        </form>
      </div>
    </>
  );
}
