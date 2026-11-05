<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Vagas de emprego exibidas em Carreiras. Em produção as tabelas foram criadas
 * manualmente, por isso cada etapa verifica se a estrutura já existe.
 */
return new class extends Migration
{
    private function timestamps(Blueprint $table): void
    {
        $table->timestamp('criado')->nullable();
        $table->timestamp('modificado')->nullable();
    }

    public function up(): void
    {
        if (!Schema::hasTable('vagas')) {
            Schema::create('vagas', function (Blueprint $table) {
                $table->id();
                $table->boolean('visivel')->default(false);
                $table->integer('ordem')->nullable();
                $table->timestamp('excluido')->nullable();
                $this->timestamps($table);
            });
        }

        if (!Schema::hasTable('vagas_idiomas')) {
            Schema::create('vagas_idiomas', function (Blueprint $table) {
                $table->id();
                $table->foreignId('vaga_id')->constrained('vagas')->cascadeOnDelete();
                $table->foreignId('idioma_id')->constrained('idiomas');
                $table->string('titulo', 48);
                $table->enum('tipo', ['presencial', 'remoto']);
                $table->text('descricao');
                $table->timestamp('excluido')->nullable();
                $this->timestamps($table);
            });
        }

        if (!Schema::hasColumn('curriculos', 'vaga_id')) {
            Schema::table('curriculos', function (Blueprint $table) {
                $table->foreignId('vaga_id')->nullable()->after('cargo_id')->constrained('vagas')->nullOnDelete();
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('curriculos', 'vaga_id')) {
            Schema::table('curriculos', function (Blueprint $table) {
                $table->dropConstrainedForeignId('vaga_id');
            });
        }

        Schema::dropIfExists('vagas_idiomas');
        Schema::dropIfExists('vagas');
    }
};
