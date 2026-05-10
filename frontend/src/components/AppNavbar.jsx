import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Moon, Settings, Sun } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../hooks/useTheme";
import { cn } from "../lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

//  NAV ITEMS
const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Profile", to: "/profile" },
  { label: "Aptitude", to: "/aptitude" },
  { label: "Learning", to: "/learning" }, 
  { label: "DevHub", to: "/DevHub" }, 
  { label: "AI Jobs", to: "/job" },
];

export default function AppNavbar() {
  const [open, setOpen] = useState(false);
  const { token, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = Boolean(token || localStorage.getItem("token"));

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/", { replace: true });
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-20 w-full max-w-[1280px] items-center justify-between px-6 sm:px-8 lg:px-10">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#111111] to-[#2a2a2a] text-lg font-bold text-white">
            S
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
            Skill<span className="text-foreground/20">_up</span>
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300",
                location.pathname === item.to
                  ? "bg-accent text-foreground"
                  : "text-foreground/80 hover:bg-accent hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* RIGHT ACTIONS */}
        <div className="hidden items-center gap-2 lg:flex">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg"
            onClick={toggleTheme}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Link
            to="/terms-and-conditions"
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-lg")}
          >
            <Settings className="h-4 w-4" />
          </Link>

          {isAuthenticated ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <>
              <Link to="/login" className={buttonVariants({ variant: "outline" })}>
                Login
              </Link>
              <Link to="/register" className={buttonVariants({ variant: "default" })}>
                Signup
              </Link>
            </>
          )}
        </div>

        {/* MOBILE */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right">
              <SheetTitle>Skill_up</SheetTitle>

              <div className="mt-10 flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-4 py-3 text-lg hover:bg-accent"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </nav>
  );
}
