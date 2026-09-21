<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('cases_clientes_idiomas', function (Blueprint $table) {
            $table->renameColumn('chamada', 'servico');
            $table->renameColumn('descricao', 'contexto');
        });

        Schema::table('cases_clientes', function (Blueprint $table) {
            $table->unsignedSmallInteger('ano')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('cases_clientes', function (Blueprint $table) {
            $table->dropColumn('ano');
        });

        Schema::table('cases_clientes_idiomas', function (Blueprint $table) {
            $table->renameColumn('servico', 'chamada');
            $table->renameColumn('contexto', 'descricao');
        });
    }
};
