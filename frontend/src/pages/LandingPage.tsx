import About from "../components/About";
import CTA from "../components/CTA";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fcfbff] dark:bg-[#0d0c13]">
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="get-started">
          <CTA />
        </section>
        <section id="testimonials">
          <Testimonials />
        </section>
      </main>
      <Footer />
    </div>
  );
}
