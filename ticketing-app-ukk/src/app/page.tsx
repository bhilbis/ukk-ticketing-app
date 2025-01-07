
import HomeBanner from "@/components/home/home-banner";
export default function Home() {
  return (
    <div className="min-h-screen pb-20 gap-16 w-full">
      <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        <HomeBanner/>
      </div>
    </div>
  );
}
