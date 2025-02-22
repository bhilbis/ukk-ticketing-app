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
    ];

    public function transport()
    {
        return $this->belongsTo(Transports::class, 'transport_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function schedules()
    {
        return $this->belongsToMany(TransportSchedule::class, 'route_schedule')->withTimestamps();;
    }
}
