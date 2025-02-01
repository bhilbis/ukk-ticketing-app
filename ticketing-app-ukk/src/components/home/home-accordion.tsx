import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function HomeAccordion() {
    return (
        <div className="flex px-[8rem] py-5 w-full">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-xl font-medium">Bagaimana cara memesan tiket?</AccordionTrigger>
                    <AccordionContent className="text-base">
                        Anda hanya perlu memilih rute, tanggal keberangkatan, dan jumlah penumpang. Setelah itu, pilih tiket yang sesuai, lakukan pembayaran, dan tiket akan langsung dikirimkan ke email Anda.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-xl font-medium">Apakah tiket bisa diubah jadwal?</AccordionTrigger>
                    <AccordionContent className="text-base">
                        Ya, perubahan jadwal dapat dilakukan sesuai dengan kebijakan maskapai atau operator kereta, dengan syarat dan ketentuan yang berlaku.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="text-xl font-medium">Apa yang harus dilakukan jika ada kendala?</AccordionTrigger>
                    <AccordionContent className="text-base">
                        Anda dapat menghubungi layanan pelanggan kami melalui live chat atau call center. Kami siap membantu Anda 24/7.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}