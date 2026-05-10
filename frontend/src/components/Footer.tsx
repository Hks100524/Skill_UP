import { Link } from "react-router-dom";
import { SiFacebook, SiGithub, SiInstagram, SiLinkedin, SiX } from "react-icons/si";

const footerColumns = [
  {
    title: "Product",
    links: ["Features", "Courses", "Pricing", "Testimonials"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Contact"],
  },
  {
    title: "Resources",
    links: ["Help Center", "Community", "Guides", "API Docs"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Security", "Cookies"],
  },
];

const socialIcons = [SiX, SiFacebook, SiLinkedin, SiInstagram, SiGithub];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-12 sm:px-8 md:py-16 lg:px-10">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-6">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#111111] to-[#2a2a2a] text-lg font-bold text-white">
                S
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                Skill<span className="text-foreground/20">_up</span>
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Empowering professionals worldwide to master new skills and unlock their full
              potential.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialIcons.map((Icon, index) => (
                <button
                  key={index}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-foreground/70 transition-all duration-300 hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-sm font-semibold">{column.title}</h3>
              <div className="space-y-3">
                {column.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="block text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">© 2025 Skill_up. All rights reserved.</p>
          <p className="text-sm text-muted-foreground">
            Built with using React, TypeScript, Tailwind css and deployed .
          </p>
        </div>
      </div>
    </footer>
  );
}
