import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionAirplane() {
    return (
        <div className="px-[10rem] py-5 w-full">
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-xl font-medium">Bagaimana cara memesan tiket pesawat?</AccordionTrigger>
                    <AccordionContent className="text-base">
                        Untuk memesan tiket pesawat, Anda dapat mengikuti langkah-langkah berikut:
                        <ol className="list-decimal pl-6 mt-2">
                            <li>Pilih rute penerbangan (asal dan tujuan).</li>
                            <li>Klik pesan tiket.</li>
                            <li>Tentukan tanggal keberangkatan dan kepulangan (jika diperlukan).</li>
                            <li>Masukkan jumlah penumpang</li>
                            <li>Pilih kursi yang tersedia</li>
                            <li>Pilih metode pembayaran dan lakukan pembayaran.</li>
                            <li>Setelah pembayaran berhasil, e-tiket akan dikirimkan ke alamat email Anda.</li>
                        </ol>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-xl font-medium">Apakah tiket pesawat bisa diubah jadwal atau di-refund?</AccordionTrigger>
                    <AccordionContent className="text-base">
                        Perubahan jadwal dan refund tiket pesawat bergantung pada kebijakan maskapai dan jenis tiket yang Anda beli. Secara umum:
                        <ul className="list-disc pl-6 mt-2">
                            <li><b>Perubahan Jadwal (Reschedule):</b> Biasanya dikenakan biaya dan mungkin hanya bisa dilakukan beberapa jam sebelum keberangkatan. Beberapa jenis tiket mungkin tidak mengizinkan perubahan jadwal.</li>
                            <li><b>Refund (Pengembalian Dana):</b> Kebijakan refund bervariasi. Tiket promo umumnya tidak dapat di-refund. Untuk tiket dengan fleksibilitas tinggi, refund mungkin bisa dilakukan dengan potongan biaya tertentu.</li>
                            <li><b>Cara Mengajukan:</b> Hubungi layanan pelanggan kami atau langsung ke pihak maskapai untuk mengajukan perubahan jadwal atau refund. Siapkan kode booking dan detail penerbangan Anda.</li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="text-xl font-medium">Apa yang harus dilakukan jika ada kendala atau pertanyaan?</AccordionTrigger>
                    <AccordionContent className="text-base">
                        Jika Anda mengalami kendala atau memiliki pertanyaan, jangan ragu untuk menghubungi layanan pelanggan kami melalui:
                        <ul className="list-disc pl-6 mt-2">
                            <li><b>Call Center:</b> Hubungi nomor telepon yang tertera di website kami.</li>
                            <li><b>Email:</b> Kirimkan email ke alamat email layanan pelanggan kami.</li>
                        </ul>
                        Kami siap membantu Anda 24 jam sehari, 7 hari seminggu.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}