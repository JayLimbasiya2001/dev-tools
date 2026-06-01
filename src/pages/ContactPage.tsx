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
    toast.success('Message received! (Demo — no backend configured)');
    reset();
  };

  return (
    <>
      <SeoHead title="Contact" description={`Contact the ${BRAND.name} team.`} path="/contact" />
      <h1 className="font-display text-3xl font-bold mb-2">Contact</h1>
      <p className="text-muted mb-8">Reach us at <a href={`mailto:${BRAND.email}`} className="text-mint">{BRAND.email}</a></p>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-4 glass rounded-2xl p-6">
        <div>
          <label htmlFor="name" className="text-sm text-muted">Name</label>
          <input id="name" {...register('name')} className="input-field mt-1" />
          {errors.name && <p className="text-coral text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="text-sm text-muted">Email</label>
          <input id="email" type="email" {...register('email')} className="input-field mt-1" />
          {errors.email && <p className="text-coral text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="message" className="text-sm text-muted">Message</label>
          <textarea id="message" {...register('message')} rows={5} className="input-field mt-1" />
          {errors.message && <p className="text-coral text-xs mt-1">{errors.message.message}</p>}
        </div>
        <button type="submit" className="btn-primary w-full">Send Message</button>
      </form>
    </>
  );
}
