import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Moon, Settings, Sun, User } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../hooks/useTheme";
import { cn } from "../lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

function NavLinkItem({
  item,
  onClick,
}: {
  item: { label: string; href?: string; to?: string };
  onClick?: () => void;
}) {
  const className =
    "rounded-full px-2.5 py-2 text-[0.97rem] font-semibold tracking-[-0.01em] text-foreground/80 transition-colors duration-200 hover:text-foreground lg:px-3";

  if ("to" in item) {
    return (
      <Link to={item.to} onClick={onClick} className={className}>
        {item.label}
      </Link>
    );
  }

  return (
    <Link to={`/${item.href}`} onClick={onClick} className={className}>
      {item.label}
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsMenuRef = useRef<HTMLDivElement | null>(null);
  const { theme, toggleTheme } = useTheme();
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const isAuthenticated = Boolean(token || localStorage.getItem("token"));

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Aptitude", to: "/aptitude" },
    { label: "Learning", to: "/learning" },
    { label: "DevHub", to: "/DevHub" },
    { label: "AI Jobs", to: "/ai-job-recommendations" },
    ...(isAuthenticated ? [{ label: "Dashboard", to: "/dashboard" }] : []),
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!settingsOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (
        settingsMenuRef.current &&
        !settingsMenuRef.current.contains(event.target as Node)
      ) {
        setSettingsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSettingsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [settingsOpen]);

  const handleLogout = () => {
    logout();
    setSettingsOpen(false);
    setOpen(false);
    navigate("/", { replace: true });
  };

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 border-0 bg-transparent backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300",
        isScrolled && "supports-[backdrop-filter]:bg-white/10 dark:supports-[backdrop-filter]:bg-black/10",
      )}
    >
      <div className="mx-auto flex h-[104px] w-full items-center gap-6 px-8 sm:px-12 lg:px-20 xl:px-[112px]">
        <Link to="/" className="flex min-w-fit items-center gap-2">
          <div className="flex h-[44px] w-[44px] items-center justify-center rounded-[0.9rem] bg-gradient-to-br from-[#111111] to-[#2a2a2a] text-[1.55rem] font-bold text-white shadow-[0_10px_30px_-18px_rgba(17,17,17,0.9)]">
            S
          </div>
          <span className="text-[1.5rem] font-semibold tracking-[-0.055em] text-[#2f2f35] dark:text-foreground">
            Skill<span className="text-[#d2ced8] dark:text-foreground/20">_up</span>
          </span>
        </Link>

        <div className="hidden flex-1 items-center justify-center lg:flex">
          <nav className="flex items-center gap-4 xl:gap-[1.45rem]">
            {navItems.map((item) => (
              <NavLinkItem key={item.label} item={item} />
            ))}
          </nav>
        </div>

        <div className="ml-auto hidden items-center gap-2.5 lg:flex">
          <Button
            variant="ghost"
            size="icon"
            className="h-[38px] w-[38px] rounded-full text-foreground/80 hover:bg-white/70 hover:text-foreground dark:hover:bg-white/10"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <div ref={settingsMenuRef} className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="h-[38px] w-[38px] rounded-full text-foreground/80 hover:bg-white/70 hover:text-foreground dark:hover:bg-white/10"
              onClick={() => setSettingsOpen((value) => !value)}
              aria-haspopup="menu"
              aria-expanded={settingsOpen}
              aria-label="Open account menu"
            >
              <Settings className="h-4 w-4" />
            </Button>

            {settingsOpen ? (
              <div className="absolute right-0 top-[calc(100%+0.7rem)] z-50 w-60 rounded-[1.15rem] border border-black/5 bg-white/95 p-2 shadow-[0_24px_60px_-30px_rgba(15,15,15,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-[#111018]/95">
                <Link
                  to="/terms-and-conditions"
                  onClick={() => setSettingsOpen(false)}
                  className="flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-medium text-foreground/80 transition-colors duration-200 hover:bg-accent hover:text-foreground"
                >
                  Terms and Conditions
                </Link>
                {isAuthenticated ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-medium text-foreground/80 transition-colors duration-200 hover:bg-accent hover:text-foreground"
                  >
                    Logout
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>

          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "rounded-full text-foreground/80 hover:bg-white/70 hover:text-foreground dark:hover:bg-white/10",
                )}
                aria-label="Open profile"
              >
                <User className="h-4 w-4" />
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-[40px] min-w-[76px] rounded-[0.9rem] border-black/10 bg-white/88 px-4 text-[0.92rem] font-semibold text-foreground shadow-[0_16px_35px_-24px_rgba(17,17,17,0.65)] backdrop-blur-sm hover:bg-white",
                )}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "h-[40px] min-w-[84px] rounded-[0.9rem] bg-[#111111] px-4 text-[0.92rem] font-semibold text-white shadow-[0_16px_35px_-20px_rgba(17,17,17,0.9)] hover:bg-[#1a1a1a]",
                )}
              >
                Signup
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="text-left text-lg font-semibold">Skill_up</SheetTitle>
              <div className="mt-10 flex flex-col gap-1">
                {navItems.map((item) => (
                  <NavLinkItem key={item.label} item={item} onClick={() => setOpen(false)} />
                ))}
              </div>

              <div className="mt-8 grid gap-3">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setOpen(false)}
                      className={cn(buttonVariants({ variant: "ghost" }), "justify-start rounded-lg")}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/terms-and-conditions"
                      onClick={() => setOpen(false)}
                      className={cn(buttonVariants({ variant: "ghost" }), "justify-start rounded-lg")}
                    >
                      Terms and Conditions
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setOpen(false)}
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "justify-center rounded-lg",
                      )}
                    >
                      Profile
                    </Link>
                    <Button
                      variant="default"
                      className="justify-center rounded-lg shadow-glow-sm hover:shadow-glow-md"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/terms-and-conditions"
                      onClick={() => setOpen(false)}
                      className={cn(buttonVariants({ variant: "ghost" }), "justify-start rounded-lg")}
                    >
                      Terms and Conditions
                    </Link>
                    <Link
                      to="/login"
                      onClick={() => setOpen(false)}
                      className={cn(buttonVariants({ variant: "outline" }), "justify-center rounded-lg")}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setOpen(false)}
                      className={cn(
                        buttonVariants({ variant: "default" }),
                        "justify-center rounded-lg shadow-glow-sm hover:shadow-glow-md",
                      )}
                    >
                      Signup
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
