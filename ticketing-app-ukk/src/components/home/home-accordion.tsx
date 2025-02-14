import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function HomeAccordion() {
    const faqItems = [
        {
            question: "Bagaimana cara memesan tiket?",
            answer: "Anda hanya perlu memilih rute, tanggal keberangkatan, dan jumlah penumpang. Setelah itu, pilih tiket yang sesuai, lakukan pembayaran, dan tiket akan langsung dikirimkan ke email Anda.",
        },
        {
            question: "Apakah tiket bisa diubah jadwal?",
            answer: "Ya, perubahan jadwal dapat dilakukan sesuai dengan kebijakan maskapai atau operator kereta, dengan syarat dan ketentuan yang berlaku.",
        },
        {
            question: "Apa yang harus dilakukan jika ada kendala?",
            answer: "Anda dapat menghubungi layanan pelanggan kami melalui live chat atau call center. Kami siap membantu Anda 24/7.",
        },
    ]

    return (
        <div className="px-[8rem] py-5">
            <div className="max-w-[79rem] mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Pertanyaan Umum</h2>
                <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                    </AccordionItem>
                ))}
                </Accordion>
            </div>
        </div>
    )
}