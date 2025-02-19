<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transports extends Model
{
    use HasFactory;

    protected $fillable = [
        'image',
        'code',
        'name_transport',
        'has_discount',
        'description',
        'type_id'
    ];

    public function type() {
        return $this->belongsTo(TransportTypes::class, 'type_id');
    }

    public function routes() {
        return $this->hasMany(Routes::class, 'transport');
    }

    public function discount() {
        return $this->hasOne(Discount::class, 'transport_id');
    }

    public function classes() {
        return $this->hasMany(TransportClass::class, 'transport_id');
    }

    public function schedules()
    {
        return $this->hasMany(TransportSchedule::class, 'transport_id');
    }
}
