<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'username',
        'name',
        'email',
        'level_id',
        'password',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
