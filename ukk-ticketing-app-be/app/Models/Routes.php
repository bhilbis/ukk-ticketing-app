<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Routes extends Model
{
    use HasFactory;

    protected $fillable = [
        'destination',
        'start_route',
        'end_route',
        'price',
        'travel_duration',
        'transport_id',
        'schedule_id'
    ];

    public function transport()
    {
        return $this->belongsTo(Transports::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function schedule()
    {
        return $this->belongsTo(TransportSchedule::class);
    }
}
