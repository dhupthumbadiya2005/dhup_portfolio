export function PageTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      <span className="h-[3px] w-12 rounded-full bg-linear-to-r from-blue-600 to-amber-500" />
      {subtitle && <p className="text-lg text-foreground/80">{subtitle}</p>}
    </div>
  );
}
