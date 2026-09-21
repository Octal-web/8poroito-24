<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CaseCliente extends Model
{
    protected $table = 'cases_clientes';
    
    const CREATED_AT = 'criado';
    const UPDATED_AT = 'modificado';

    protected $fillable = ['*'];

    protected $guarded = ['id'];

    public function casesClientesIdiomas()
    {
        return $this->hasMany(CaseClienteIdioma::class);
    }

    public function imagensCases()
    {
        return $this->hasMany(ImagemCase::class);
    }
}