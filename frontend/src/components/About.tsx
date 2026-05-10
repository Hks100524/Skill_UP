import { Award, Target, TrendingUp, Users } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const aboutCards = [
  {
    title: "Focused Learning",
    description: "Curated courses designed to help you achieve specific career goals",
    icon: Target,
  },
  {
    title: "Expert Instructors",
    description: "Learn from industry professionals with real-world experience",
    icon: Users,
  },
  {
    title: "Track Progress",
    description: "Monitor your growth with detailed analytics and milestones",
    icon: TrendingUp,
  },
  {
    title: "Earn Certificates",
    description: "Showcase your achievements with recognized certifications",
    icon: Award,
  },
];

const stats = [
  { value: "10M+", label: "Learning Hours" },
  { value: "150+", label: "Countries" },
  { value: "4.9/5", label: "Average Rating" },
  { value: "24/7", label: "Support Available" },
];

export default function About() {
  return (
    <div className="bg-muted/30 py-20 md:py-32">
      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              About <span className="text-primary">Skill_up</span>
            </h2>
            <p className="text-lg text-muted-foreground md:text-xl">
              Skill_up is a modern learning platform designed for ambitious professionals who want
              to stay ahead in their careers. Whether you&apos;re looking to switch industries,
              advance in your current role, or explore new passions, we provide the tools and
              resources you need to succeed.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {aboutCards.map(({ title, description, icon: Icon }) => (
              <Card
                key={title}
                className="group border-border/50 hover:border-primary/50 hover:shadow-glow-sm"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-all duration-300 group-hover:bg-primary/20">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label}>
                <div className="mb-2 text-3xl font-bold text-primary md:text-4xl">{item.value}</div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
