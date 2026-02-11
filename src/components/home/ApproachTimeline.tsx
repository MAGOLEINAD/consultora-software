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

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[hsl(var(--neutral-800))]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
