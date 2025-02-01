import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Clock, Train, Shield, MapPin } from "lucide-react"

const BenefitTrain = () => {
    const benefits = [
      {
        icon: <Clock className="h-6 w-6" />,
        title: "Efisien Waktu",
        description: "Perjalanan lebih cepat dengan waktu tempuh yang terprediksi"
      },
      {
        icon: <Shield className="h-6 w-6" />,
        title: "Keamanan Terjamin",
        description: "Sistem keamanan modern dan staff profesional"
      },
      {
        icon: <Train className="h-6 w-6" />,
        title: "Armada Modern",
        description: "Kereta dengan teknologi terbaru untuk kenyamanan maksimal"
      },
      {
        icon: <MapPin className="h-6 w-6" />,
        title: "Jangkauan Luas",
        description: "Melayani berbagai rute ke seluruh penjuru negeri"
      }
    ]
  
    const faqItems = [
      {
        question: "Bagaimana cara memesan tiket kereta api?",
        answer: "Pemesanan tiket dapat dilakukan melalui aplikasi resmi, website, atau loket stasiun. Pastikan mempersiapkan data diri yang valid untuk proses pemesanan."
      },
      {
        question: "Berapa jam sebelum keberangkatan harus tiba di stasiun?",
        answer: "Penumpang disarankan tiba di stasiun minimal 30 menit sebelum jadwal keberangkatan untuk proses check-in dan boarding."
      },
      {
        question: "Apa saja yang perlu dibawa saat naik kereta?",
        answer: "Dokumen penting seperti tiket, KTP, dan bukti vaksinasi. Juga disarankan membawa masker, hand sanitizer, dan kebutuhan pribadi lainnya."
      },
      {
        question: "Bagaimana kebijakan pembatalan tiket?",
        answer: "Pembatalan tiket dapat dilakukan minimal 3 jam sebelum keberangkatan dengan biaya administrasi tertentu sesuai ketentuan yang berlaku."
      }
    ]

    return (
        <>
            <section className="py-12 px-4">
                <div className="max-w-[78rem] mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Keunggulan Perjalanan Kereta Api</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {benefits.map((benefit, index) => (
                    <Card key={index}>
                        <CardHeader>
                        <div className="mb-2">{benefit.icon}</div>
                        <CardTitle>{benefit.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                        <p className="text-gray-600">{benefit.description}</p>
                        </CardContent>
                    </Card>
                    ))}
                </div>
                </div>
            </section>

            <section className="py-12 px-4 bg-white">
                <div className="max-w-[78rem] mx-auto">
                <Card>
                    <CardHeader>
                    <CardTitle>Informasi Perjalanan Kereta Api</CardTitle>
                    <CardDescription>
                        Pahami informasi penting sebelum melakukan perjalanan
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <div className="space-y-4">
                        <p>
                        Kereta api merupakan moda transportasi yang menghubungkan berbagai kota di Indonesia.
                        Dengan jaringan rel yang luas, kereta api menjadi pilihan transportasi yang efisien
                        dan nyaman bagi masyarakat.
                        </p>
                        <p>
                        Layanan kereta api terus dikembangkan dengan berbagai fasilitas modern seperti
                        sistem pemesanan online, gerbong berpendingin udara, dan layanan pendukung di stasiun
                        untuk memberikan pengalaman perjalanan terbaik.
                        </p>
                    </div>
                    </CardContent>
                </Card>
                </div>
            </section>

            <section className="py-12 px-4">
                <div className="max-w-[78rem] mx-auto">
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
            </section>
        </>
    )
}

export default BenefitTrain