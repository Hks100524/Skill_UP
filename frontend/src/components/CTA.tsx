import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { buttonVariants } from "./ui/button";

const benefits = [
  "Start with 7-day free trial",
  "No credit card required",
  "Cancel anytime",
  "Access to all courses",
];

export default function CTA() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.14),transparent_28%)]" />

      <div className="relative mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
            Ready to Transform Your <span className="text-primary">Career?</span>
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Join thousands of professionals who are already upskilling with Skill_up. Start your
            learning journey today and unlock your potential.
          </p>

          <div className="mb-10 flex flex-wrap justify-center gap-4">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center space-x-2 rounded-full border border-border bg-background/50 px-4 py-2 backdrop-blur-sm"
              >
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/register"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "group rounded-lg px-10 py-6 text-base shadow-glow-md hover:shadow-glow-lg",
              )}
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href="mailto:demo@skillup.app"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-lg px-10 py-6 text-base",
              )}
            >
              Schedule a Demo
            </a>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Trusted by professionals at leading companies worldwide
          </p>
        </div>
      </div>
    </div>
  );
}
