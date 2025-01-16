import HomeBanner from "@/components/home/home-banner";
import HomeCarousel from "@/components/home/home-carousel";
import HomeCoupon from "@/components/home/home-coupon";
import HomeSlider from "@/components/home/home-slider";

import 'swiper/css'
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import HomeSuggest from "@/components/home/home-suggest";

export default function Home() {
  return (
      <div className="min-h-screen pb-12 gap-16 w-full">
        <div className="gap-8 w-full">
          <HomeBanner />
          <HomeSlider />
          <HomeCoupon />
          <HomeCarousel />
          <HomeSuggest />
        </div>
      </div>
  );
}
