import SectionHeading from '@/components/shared/SectionHeading';

interface Step {
  title: string;
  description: string;
}

interface ApproachTimelineProps {
  title: string;
  subtitle: string;
  steps: Step[];
}

export default function ApproachTimeline({ title, subtitle, steps }: ApproachTimelineProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading title={title} subtitle={subtitle} />

        <div className="relative max-w-6xl mx-auto">
          <div className="absolute left-6 right-6 top-9 hidden lg:block h-px bg-[hsl(var(--border))]"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative rounded-2xl border border-[hsl(var(--border))] p-6 bg-[hsl(var(--neutral-50))] shadow-sm">
                <div className="absolute -top-5 left-6 h-10 w-10 rounded-full bg-[hsl(var(--primary))] text-white flex items-center justify-center font-semibold shadow-lg">
                  {index + 1}
                </div>
                <h3 className="font-display text-lg font-semibold text-[hsl(var(--accent))] mb-3 mt-4">
                  {step.title}
                </h3>
                <p className="text-sm text-[hsl(var(--neutral-800))]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
