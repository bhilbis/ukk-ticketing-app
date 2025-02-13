import LottieAnimation from "@/components/404/lottieAnimation";

export default function NotFound() {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <div className="flex flex-col items-center z-10 gap-[21rem]">
                <h1 className="text-4xl font-bold z-10">Halaman Tidak Ditemukan</h1>
                <p className="text-gray-500 mt-2 z-10">Sepertinya kamu tersesat...</p>
            </div>
             <LottieAnimation width={800} height={800}/>
        </div>
    );
}  