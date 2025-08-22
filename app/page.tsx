import { MacbookScroll } from '@/components/ui/macbook-scroll';

export default function Page() {
  return (
    <main className="relative">
      <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-900/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
            Build beautiful apps faster
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/70">
            Scroll to explore the product in a 3D MacBook preview inspired by Aceternity UI.
          </p>
        </div>
      </section>

      <MacbookScroll
        title="Your product, in motion"
        subtitle="A 3D scroll experience showcasing screens, features and flow."
        slides={[
          {
            heading: 'Dashboard Overview',
            description: 'Get instant insights with real-time metrics and KPIs.',
            color: 'from-sky-500 to-blue-600'
          },
          {
            heading: 'Collaboration',
            description: 'Comment, assign, and track changes with your team.',
            color: 'from-violet-500 to-fuchsia-600'
          },
          {
            heading: 'Automation',
            description: 'Automate repetitive tasks with powerful workflows.',
            color: 'from-emerald-500 to-teal-600'
          }
        ]}
      />

      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold">Ready to ship</h2>
        <p className="mt-4 text-white/70">
          This section sits after the scroll experience. Replace with your CTA or pricing.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a href="#" className="rounded-md bg-sky-500 px-5 py-2.5 font-medium text-white shadow-glow hover:bg-sky-400 transition">Get started</a>
          <a href="#" className="rounded-md border border-white/15 px-5 py-2.5 font-medium text-white/90 hover:bg-white/5 transition">Learn more</a>
        </div>
      </section>
    </main>
  );
}
