import LottieAnimation from "@/components/404/lottieAnimation";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="h-screen flex flex-col items-center justify-center text-center px-6">
            {/* Animasi Balon 404 */}
                <LottieAnimation width={800} height={800} />

            {/* Teks & Navigasi */}
            <div className="z-10 flex flex-col gap-32">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-800">Oops!</h1>
                    <h2 className="text-2xl font-semibold text-gray-700 mt-2">Halaman Tidak Ditemukan</h2>
                </div>
               <div>
                <p className="text-gray-500 mt-2">Sepertinya kamu tersesat...</p>
                    <Link href="/">
                        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                            Kembali ke Beranda
                        </button>
                    </Link>
               </div>
            </div>
        </div>
    );
}
