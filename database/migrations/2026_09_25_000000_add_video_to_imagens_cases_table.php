<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('imagens_cases', function (Blueprint $table) {
            $table->string('tipo', 10)->default('imagem')->after('imagem');
            $table->string('poster')->nullable()->after('tipo');
        });
    }

    public function down(): void
    {
        Schema::table('imagens_cases', function (Blueprint $table) {
            $table->dropColumn(['tipo', 'poster']);
        });
    }
};
