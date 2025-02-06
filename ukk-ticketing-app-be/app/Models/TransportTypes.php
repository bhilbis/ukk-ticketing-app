<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransportTypes extends Model
{
    use HasFactory; 

    protected $fillable = [
        'type_name',
        'description'
    ];

    public function transports()
    {
        return $this->hasMany(Transports::class);
    }
}
