<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('cases_clientes_idiomas', function (Blueprint $table) {
            $table->string('campanha', 255)->nullable()->after('titulo');
        });
    }

    public function down(): void
    {
        Schema::table('cases_clientes_idiomas', function (Blueprint $table) {
            $table->dropColumn('campanha');
        });
    }
};
