<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Curriculo extends Model
{
    protected $table = 'curriculos';
    
    const CREATED_AT = 'criado';
    const UPDATED_AT = 'modificado';

    protected $fillable = ['*'];

    protected $guarded = ['id'];
    
    public function cargo()
    {
        return $this->belongsTo(Cargo::class);
    }

    public function redes_sociais()
    {
        return $this->hasMany(RedeSocial::class);
    }
}
