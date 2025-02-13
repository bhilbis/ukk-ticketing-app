<?php

namespace App\Mail;

use App\Models\Passenger;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Http\JsonResponse;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ResetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    public $code,$name;

    /**
     * Create a new message instance.
     */
    public function __construct($code, $email)
    {
        $this->code = $code;
        $this->name = Passenger::where('email', $email)->value('name_passenger');
        //
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Reset Password Mail',
        );
    }

    /**
     * Get the message content definition.
     */

     public function build()
     {
         return $this->subject('Penting: Kode Reset Password anda untuk [Account Name]')
                     ->html('
                         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px;">
                             <div style="text-align: center; margin-bottom: 30px;">
                                 <h1 style="color: #2b6cb0;">TravelLink</h1>
                                 <h2 style="color: #2d3748;">Permintaan Reset Password</h2>
                             </div>
     
                             <div style="background-color: #f7fafc; padding: 25px; border-radius: 8px; border: 1px solid #e2e8f0;">
                                 <p style="color: #4a5568; line-height: 1.6;">Untuk ' . $this->name . ',</p>
                                 
                                 <p style="color: #4a5568; line-height: 1.6;">Kita menerima permintaan reset password. Mohon gunakan kode berikut:</p>
     
                                 <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; text-align: center; margin: 25px 0; font-weight: bold; font-size: 24px; color: #2b6cb0; border: 2px dashed #c3dafe;">
                                     ' . $this->code . '
                                 </div>
     
                                 <p style="color: #4a5568; line-height: 1.6;">Kode ini hanya berlaku selama 15 menit. Jika anda tidak tidak melakukan permintaan ini, abaikan email atau hubungi tim kami secepat mungkin.</p>
     
                                 <p style="color: #4a5568; line-height: 1.6;">Untuk alasan keamanan:
                                     <ul style="color: #4a5568; margin: 10px 0; padding-left: 20px;">
                                         <li>Jangan mengirim/membagikan kode ini kepada siapapun</li>
                                         <li>Tim kami tidak akan pernah meminta kode ini</li>
                                         <li>Hapus email ini setelah kata sandi disetel ulang</li>
                                     </ul>
                                 </p>
     
                                 <p style="color: #4a5568; line-height: 1.6;">Best regards,<br>
                                 TravelLink Tim Keamanan</p>
                             </div>
     
                             <div style="text-align: center; margin-top: 30px; color: #718096; font-size: 12px;">
                                 <p>Butuh bantuan? Hubungi tim dukungan kami di <a href="mailto:bhilbis123@gmail.com" style="color: #4299e1;">[Support-Email]</a></p>
                                 <p>TravelLink • [Company Address]</p>
                                 <div style="margin-top: 15px;">
                                     <a href="[Website-URL]" style="color: #4299e1; text-decoration: none; margin: 0 10px;">Website Kami</a>
                                     <a href="[Privacy-Policy-URL]" style="color: #4299e1; text-decoration: none; margin: 0 10px;">Kebijakan Privasi</a>
                                 </div>
                             </div>
                         </div>
                     ');
     }
    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
