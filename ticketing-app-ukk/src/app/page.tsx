
import HomeBanner from "@/components/home/home-banner";
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <HomeBanner/>
      </div>
    </div>
  );
}
