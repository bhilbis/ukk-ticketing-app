<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransportSchedule extends Model
{
    use HasFactory;

    protected $fillable = ['departure_date', 'departure_time'];

    public function routes()
    {
        return $this->belongsToMany(Routes::class, 'route_schedule', 'transport_schedule_id', 'routes_id')->withTimestamps();
    }
}
