<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransportClass extends Model
{
    use HasFactory;

    protected $fillable = ['transport_id', 'class_name', 'seat_count'];

    public function transport() {
        return $this->belongsTo(Transports::class, 'transport_id');
    }
}
