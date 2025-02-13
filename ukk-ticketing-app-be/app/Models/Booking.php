<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_code',
        'passenger_id',
        'booking_date',
        'booking_place',
        'seat_code',
        'route_id',
        'destination',
        'departure_date',
        'check_in_time',
        'departure_time',
        'booking_status',
        'payment_status',
        'total_payment',
        'staff_id',
    ];

    public function passenger()
    {
        return $this->belongsTo(Passenger::class);
    }

    public function route()
    {
        return $this->belongsTo(Routes::class);
    }

    public function staff()
    {
        return $this->belongsTo(Staff::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

}
