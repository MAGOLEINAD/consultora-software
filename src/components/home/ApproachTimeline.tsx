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

        <div className="max-w-6xl mx-auto">
          <div className="hidden lg:flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`h-14 w-14 rounded-full border-4 ${
                      index === 0 ? 'bg-accent text-white border-accent' : 'border-neutral-300 text-neutral-600'
                    } flex items-center justify-center text-lg font-semibold`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <p className="mt-4 text-sm font-semibold text-accent">{step.title}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="mx-1 flex items-center">
                    <div className="relative h-0.5 w-32 bg-neutral-200">
                      <svg
                        viewBox="0 0 24 24"
                        className="absolute right-0 -top-2 h-4 w-4 text-neutral-400 bg-white rounded-full"
                        aria-hidden="true"
                      >
                        <path
                          d="M5 12h14m0 0-5-5m5 5-5 5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">
            {steps.map((step, index) => (
              <div key={index} className="rounded-2xl border border-border p-5 bg-neutral-50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <h3 className="font-display text-base font-semibold text-accent">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm text-neutral-800">
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
