import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";

export default function HackathonsSection() {
  return (
    <section id="hackathons">
      <div className="flex min-h-0 flex-col gap-y-6 w-full">
        <div className="flex items-center w-full">
          <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
          <div className="border bg-primary z-10 rounded-xl px-4 py-1">
            <span className="text-background text-sm font-medium">Hackathons</span>
          </div>
          <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
        </div>
        <div className="flex flex-col gap-y-4">
          {DATA.hackathons.map((hackathon) => (
            <div
              key={hackathon.title}
              className="flex flex-col gap-1 border-b border-border pb-4 last:border-0 last:pb-0"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-sm leading-none">
                    {hackathon.title}
                  </span>
                  {"win" in hackathon && hackathon.win && (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 font-medium rounded-full">
                      {hackathon.win}
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-muted-foreground tabular-nums shrink-0">
                  {hackathon.dates}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{hackathon.location}</p>
              {hackathon.description && (
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {hackathon.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
