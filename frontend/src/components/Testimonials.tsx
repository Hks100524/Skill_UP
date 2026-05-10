import { Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer",
    company: "Tech Corp",
    avatar: "SJ",
    quote:
      "Skill_up helped me transition from marketing to software development in just 6 months. The courses are practical, engaging, and aligned to industry needs.",
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    company: "Innovation Labs",
    avatar: "MC",
    quote:
      "The best investment I made in my career. The structured learning paths and hands-on projects gave me the confidence to lead product teams effectively.",
  },
  {
    name: "Emily Rodriguez",
    role: "UX Designer",
    company: "Design Studio",
    avatar: "ER",
    quote:
      "I love how Skill_up combines theory with real-world applications. The community support and feedback from instructors made all the difference in my learning journey.",
  },
  {
    name: "David Kim",
    role: "Data Analyst",
    company: "Analytics Pro",
    avatar: "DK",
    quote:
      "The analytics and progress tracking features kept me motivated throughout. I completed 5 courses in 3 months and got promoted at work.",
  },
  {
    name: "Lisa Thompson",
    role: "Marketing Director",
    company: "Growth Agency",
    avatar: "LT",
    quote:
      "Skill_up offers the perfect balance of flexibility and structure. I could learn at my own pace while still staying accountable to my goals.",
  },
  {
    name: "James Wilson",
    role: "Full Stack Developer",
    company: "Startup Inc",
    avatar: "JW",
    quote:
      "The quality of content is exceptional. Every course is up-to-date with industry standards and the instructors are genuinely invested in student success.",
  },
];

export default function Testimonials() {
  return (
    <div className="bg-muted/30 py-20 md:py-32">
      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              What Our <span className="text-primary">Learners Say</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of satisfied learners who have transformed their careers with Skill_up
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item) => (
              <Card
                key={item.name}
                className="h-full border-border/50 hover:border-primary/50 hover:shadow-glow-sm"
              >
                <CardContent className="flex h-full flex-col p-6">
                  <Quote className="mb-4 h-8 w-8 text-primary/30" />
                  <p className="mb-6 flex-grow text-sm italic text-muted-foreground">
                    &quot;{item.quote}&quot;
                  </p>
                  <div className="flex items-center space-x-3">
                    <Avatar className="border-2 border-primary/30 bg-primary/20">
                      <AvatarFallback>{item.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-semibold">{item.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.role} at {item.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
