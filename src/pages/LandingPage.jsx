import Navigation from "../components/LandingNavigation";
import HeroSection from "../components/landing/HeroSection";
import Features from "../components/landing/Feature";
import Footer from "../components/landing/Footer";
import HowItWorks from "../components/landing/HowItWorks";
import CTASection from "../components/landing/CTASection";

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#504B38]">
      <Navigation />
      <HeroSection />
      <Features />
      <HowItWorks />
      <CTASection />
      <Footer />
    </div>
  );
}