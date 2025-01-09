import HomeBanner from "@/components/home/home-banner";
import HomeCarousel from "@/components/home/home-carousel";
export default function Home() {
  return (
      <div className="min-h-screen pb-12 gap-16 w-full">
        <div className="gap-8 w-full">
          <HomeBanner/>
          <HomeCarousel/>
        </div>
      </div>
  );
}
