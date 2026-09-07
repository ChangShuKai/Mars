import Navigation from "@/components/ui/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import PanoramaViewer from "@/components/sections/PanoramaViewer";
import InsightStation from "@/components/sections/InsightStation";
import RoverFeed from "@/components/sections/RoverFeed";
import MarsFacts from "@/components/sections/MarsFacts";
import MissionTimeline from "@/components/sections/MissionTimeline";
import ApodSection from "@/components/sections/ApodSection";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <HeroSection />
      <PanoramaViewer />
      <InsightStation />
      <RoverFeed />
      <MarsFacts />
      <MissionTimeline />
      <ApodSection />
      <Footer />
    </main>
  );
}
