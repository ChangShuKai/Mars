import Navigation from "@/components/ui/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import MarsMapSection from "@/components/sections/MarsMapSection";
import PanoramaViewer from "@/components/sections/PanoramaViewer";
import InsightStation from "@/components/sections/InsightStation";
import RoverFeed from "@/components/sections/RoverFeed";
import RawImagesSection from "@/components/sections/RawImagesSection";
import MarsFacts from "@/components/sections/MarsFacts";
import MissionTimeline from "@/components/sections/MissionTimeline";
import ApodSection from "@/components/sections/ApodSection";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="relative bg-space-950 text-white selection:bg-mars-500/30 selection:text-white flex flex-col gap-20 md:gap-32 overflow-hidden">
      {/* Seamless global background to tie the page together */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-space-900 via-space-950 to-black opacity-80" />
      
      <div className="relative z-10 flex flex-col gap-24 md:gap-40">
        <Navigation />
        <HeroSection />
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-mars-500/20 to-transparent" />
        
        <MarsMapSection />
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-mars-500/20 to-transparent" />

        <PanoramaViewer />
        <InsightStation />
        <RoverFeed />
        <RawImagesSection />
        <MarsFacts />
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-mars-500/20 to-transparent" />
        
        <MissionTimeline />
        <ApodSection />
      </div>

      <Footer />
    </main>
  );
}
