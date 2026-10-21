import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Philosophy from "@/components/Philosophy";
import LatestPosts from "@/components/LatestPosts";
import TechStack from "@/components/TechStack";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#08080c] text-zinc-100 bg-grid-pattern relative selection:bg-[#FF5A1F]/30 selection:text-white">
      {/* Top Floating Glass Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        <Hero />
        <ProductGrid />
        <Philosophy />
        <LatestPosts />
        <TechStack />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
