import {
  BarChart3,
  BookOpen,
  Clock,
  MessageSquare,
  Smartphone,
  Trophy,
  Users,
  Video,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";

const features = [
  {
    title: "Comprehensive Courses",
    description:
      "Access a vast library of courses covering technology, business, design, and more.",
    icon: BookOpen,
  },
  {
    title: "HD Video Lessons",
    description:
      "Learn through high-quality video content with interactive exercises and quizzes.",
    icon: Video,
  },
  {
    title: "Community Learning",
    description:
      "Connect with peers, join study groups, and collaborate on projects together.",
    icon: Users,
  },
  {
    title: "Gamified Experience",
    description:
      "Earn badges, complete challenges, and climb leaderboards as you progress.",
    icon: Trophy,
  },
  {
    title: "Learn at Your Pace",
    description:
      "Flexible scheduling allows you to learn whenever and wherever suits you best.",
    icon: Clock,
  },
  {
    title: "Mobile Learning",
    description:
      "Access courses on any device with our responsive platform and mobile apps.",
    icon: Smartphone,
  },
  {
    title: "Progress Analytics",
    description:
      "Track your learning journey with detailed insights and performance metrics.",
    icon: BarChart3,
  },
  {
    title: "Expert Support",
    description:
      "Get help when you need it with instructor Q&A and dedicated support team.",
    icon: MessageSquare,
  },
];

export default function Features() {
  return (
    <div className="py-20 md:py-32">
      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              Powerful Features for <span className="text-primary">Effective Learning</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to accelerate your learning journey and achieve your goals
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ title, description, icon: Icon }) => (
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
        </div>
      </div>
    </div>
  );
}
