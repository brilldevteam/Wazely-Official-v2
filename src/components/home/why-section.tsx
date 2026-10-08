import {
  Container,
  SectionHeading,
  toneIcon,
} from "@/components/home/primitives";
import { Stagger, StaggerItem } from "@/components/home/reveal";
import { SpotlightCard } from "@/components/home/spotlight-card";
import { reasons } from "@/data/home";
import { cn } from "@/lib/utils";

export function WhySection() {
  return (
    <section
      id="about"
      aria-labelledby="why-title"
      className="scroll-mt-28 py-20 sm:py-24"
    >
      <Container>
        <SectionHeading
          id="why-title"
          pill="Why Wazely"
          lead="Why GCC teams"
          accent="choose Wazely"
          description="Connected products, local context, and controls that grow with your team."
        />
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <StaggerItem key={reason.title}>
                <SpotlightCard className="bg-wz-surface border-wz-line group h-full rounded-[22px] border p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-30px_rgb(var(--wz-shadow)/0.45)]">
                  <span
                    className={cn(
                      "grid size-13 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6",
                      toneIcon[reason.tone],
                    )}
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-6"
                      strokeWidth={1.8}
                    />
                  </span>
                  <h3 className="text-wz-ink mt-6 text-xl font-bold tracking-tight">
                    {reason.title}
                  </h3>
                  <p className="text-wz-muted mt-3 text-[15px] leading-relaxed">
                    {reason.description}
                  </p>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
