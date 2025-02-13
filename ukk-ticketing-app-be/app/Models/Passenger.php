<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Passenger extends Model
{

    use HasFactory;

    protected $fillable = [
        'user_id',
        'username',
        'email',
        'password',
        'name_passenger',
        'address',
        'telp',
        'gender',
        'birth',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function booking()
    {
        return $this->hasMany(Booking::class, 'passenger_id', 'id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}
