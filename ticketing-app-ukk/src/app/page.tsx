import HomeBanner from "@/components/home/home-banner";
import HomeCarousel from "@/components/home/home-carousel";
import HomeCoupon from "@/components/home/home-coupon";
import HomeSlider from "@/components/home/home-slider";
import HomeSuggest from "@/components/home/home-suggest";
import { HomeAccordion } from "@/components/home/home-accordion";
import HomeAds from "@/components/home/home-ads";
import AirlaneAirplane from "@/components/home/airlane-airplane";
import TypeTrain from "@/components/home/type-train";
// import { Routes } from "@/services/methods/route";

export default function Home() {
  return (
      <div className="min-h-screen pb-12 gap-16 w-full">
        <div className="gap-8 w-full">
          <HomeBanner />
          <HomeSlider />
          <HomeCoupon />
          <HomeCarousel />
          <HomeAds />
          <AirlaneAirplane />
          <TypeTrain />
          <HomeSuggest />
          <HomeAccordion />
        </div>
      </div>
  );
}
