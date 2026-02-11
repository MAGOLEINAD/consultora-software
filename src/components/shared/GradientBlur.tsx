export default function GradientBlur({ variant = 'primary' }: { variant?: 'primary' | 'accent' }) {
  const gradientClass = variant === 'primary'
    ? 'from-primary to-accent'
    : 'from-accent to-accent-secondary';

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div
        className={`absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br ${gradientClass} rounded-full opacity-10 blur-3xl`}
      />
      <div
        className={`absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr ${gradientClass} rounded-full opacity-10 blur-3xl`}
      />
    </div>
  );
}

