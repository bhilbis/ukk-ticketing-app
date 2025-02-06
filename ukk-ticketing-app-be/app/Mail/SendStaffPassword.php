<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SendStaffPassword extends Mailable
{
    use Queueable, SerializesModels;

    public $user, $password;

    /**
     * Create a new message instance.
     */
    public function __construct($user, $password)
    {
        $this->user = $user;
        $this->password = $password;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Akun Staff TravelLink Anda Telah Dibuat',
        );
    }

    /**
     * Get the message content definition.
     */
    public function build()
    {
        return $this->subject('')
                    ->html($this->emailTemplate());
    }

    private function emailTemplate()
    {
        return '
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Akun Staff TravelLink</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; overflow: hidden;">
                <!-- Header -->
                <tr>
                    <td align="center" style="background-color: #007bff; padding: 20px; color: #ffffff; font-size: 24px; font-weight: bold;">
                        TravelLink
                    </td>
                </tr>
                <!-- Body -->
                <tr>
                    <td style="padding: 20px; text-align: center;">
                        <h2 style="color: #333;">Selamat Datang, ' . $this->user->name . '!</h2>
                        <p style="color: #555; font-size: 16px;">
                            Akun staff TravelLink Anda telah berhasil dibuat.
                        </p>
                        <p style="font-size: 16px; background-color: #f8f9fa; padding: 10px; border-radius: 5px; display: inline-block;">
                            <strong>Email:</strong> ' . $this->user->email . '<br>
                            <strong>Password:</strong> ' . $this->password . '
                        </p>
                        <p style="color: #555; font-size: 16px;">
                            Silakan login ke akun Anda dengan mengklik tombol di bawah ini:
                        </p>
                        <a href="http://localhost:3000/login" style="background-color: #007bff; color: #ffffff; padding: 12px 24px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">
                            Login Sekarang
                        </a>
                        <p style="margin-top: 20px; font-size: 14px; color: #777;">
                            Jangan lupa untuk segera mengubah password Anda setelah login.
                        </p>
                    </td>
                </tr>
                <!-- Footer -->
                <tr>
                    <td align="center" style="background-color: #007bff; padding: 10px; color: #ffffff; font-size: 14px;">
                        &copy; ' . date('Y') . ' TravelLink. All rights reserved.
                    </td>
                </tr>
            </table>
        </body>
        </html>';
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
