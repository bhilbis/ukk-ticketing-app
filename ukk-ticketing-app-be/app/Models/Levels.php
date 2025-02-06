<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Levels extends Model
{

    protected $fillable = [
        'level_name',
    ];
    
    public function users()
    {
        return $this->hasMany(User::class, 'level_id');
    }
}
