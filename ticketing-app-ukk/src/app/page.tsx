import HomeBanner from "@/components/home/home-banner";
import HomeCarousel from "@/components/home/home-carousel";
import HomeCoupon from "@/components/home/home-coupon";
import HomeSlider from "@/components/home/home-slider";
import HomeSuggest from "@/components/home/home-suggest";
import { HomeAccordion } from "@/components/home/home-accordion";
import HomeAds from "@/components/home/home-ads";

export default function Home() {
  return (
      <div className="min-h-screen pb-12 gap-16 w-full">
        <div className="gap-8 w-full">
          <HomeBanner />
          <HomeSlider />
          <HomeCoupon />
          <HomeCarousel />
          <HomeAds />
          <HomeSuggest />
          <HomeAccordion />
        </div>
      </div>
  );
}
