<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vaga extends Model
{
    protected $table = 'vagas';
    
    const CREATED_AT = 'criado';
    const UPDATED_AT = 'modificado';

    protected $fillable = ['*'];

    protected $guarded = ['id'];

    public function vagasIdiomas()
    {
        return $this->hasMany(VagaIdioma::class);
    }

    public function curriculos()
    {
        return $this->hasMany(Curriculo::class);
    }
}
