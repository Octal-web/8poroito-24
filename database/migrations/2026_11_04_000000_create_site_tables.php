<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Schema do site reconstruído a partir do código (models, controllers e Manager),
 * após o banco 8poroito03 ter sido apagado. Os models usam "criado"/"modificado"
 * como timestamps e "excluido" como soft delete manual.
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
        Schema::create('idiomas', function (Blueprint $table) {
            $table->id();
            $table->string('nome', 50);
            $table->string('codigo', 10)->unique();
            $table->boolean('padrao')->default(false);
            $this->timestamps($table);
        });

        Schema::create('paginas', function (Blueprint $table) {
            $table->id();
            $table->string('controladora', 100);
            $table->string('acao', 100);
            $table->string('imagem')->nullable();
            $this->timestamps($table);
            $table->index(['controladora', 'acao']);
        });

        Schema::create('paginas_idiomas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pagina_id')->constrained('paginas')->cascadeOnDelete();
            $table->foreignId('idioma_id')->constrained('idiomas');
            $table->string('titulo')->nullable();
            $table->text('descricao')->nullable();
            $table->string('titulo_compartilhamento')->nullable();
            $table->text('descricao_compartilhamento')->nullable();
            $this->timestamps($table);
        });

        Schema::create('conteudos', function (Blueprint $table) {
            $table->id();
            $table->string('controladora', 100);
            $table->string('acao', 100);
            $table->string('imagem')->nullable();
            $table->string('imagem_mobile')->nullable();
            $table->timestamp('excluido')->nullable();
            $this->timestamps($table);
            $table->index(['controladora', 'acao']);
        });

        Schema::create('conteudos_parametros', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conteudo_id')->constrained('conteudos')->cascadeOnDelete();
            $table->string('descricao');
            $table->boolean('habilitar_titulo')->default(false);
            $table->boolean('habilitar_subtitulo')->default(false);
            $table->boolean('habilitar_texto')->default(false);
            $table->boolean('texto_formatado')->default(false);
            $table->boolean('habilitar_link')->default(false);
            $table->boolean('habilitar_img')->default(false);
            $table->unsignedInteger('largura_img')->nullable();
            $table->unsignedInteger('altura_img')->nullable();
            $table->boolean('recortar_img')->default(false);
            $table->boolean('habilitar_img_mobile')->default(false);
            $table->unsignedInteger('largura_img_mobile')->nullable();
            $table->unsignedInteger('altura_img_mobile')->nullable();
            $table->boolean('recortar_img_mobile')->default(false);
            $table->boolean('habilitar_arquivo')->default(false);
            $table->boolean('minimizavel')->default(false);
            $table->boolean('galeria')->default(false);
        });

        Schema::create('conteudos_idiomas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conteudo_id')->constrained('conteudos')->cascadeOnDelete();
            $table->foreignId('idioma_id')->constrained('idiomas');
            $table->string('titulo')->nullable();
            $table->string('subtitulo')->nullable();
            $table->longText('texto')->nullable();
            $table->string('link')->nullable();
            $table->boolean('nova_aba')->nullable();
            $table->string('video')->nullable();
            $table->string('imagem')->nullable();
            $table->string('imagem_mobile')->nullable();
            $table->string('arquivo')->nullable();
            $this->timestamps($table);
        });

        Schema::create('imagens', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conteudo_id')->nullable()->constrained('conteudos')->nullOnDelete();
            $table->string('controladora', 100)->nullable();
            $table->string('acao', 100)->nullable();
            $table->string('imagem');
            $table->boolean('visivel')->default(true);
            $table->integer('ordem')->default(0);
            $table->timestamp('excluido')->nullable();
            $this->timestamps($table);
        });

        Schema::create('cases_clientes', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('imagem')->nullable();
            $table->string('imagem_grid')->nullable();
            $table->string('banner')->nullable();
            $table->unsignedSmallInteger('ano')->nullable();
            $table->boolean('destaque')->default(false);
            $table->boolean('visivel')->default(true);
            $table->integer('ordem')->default(0);
            $table->timestamp('excluido')->nullable();
            $this->timestamps($table);
        });

        Schema::create('cases_clientes_idiomas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('case_cliente_id')->constrained('cases_clientes')->cascadeOnDelete();
            $table->foreignId('idioma_id')->constrained('idiomas');
            $table->string('titulo');
            $table->string('campanha')->nullable();
            $table->string('servico')->nullable();
            $table->longText('contexto')->nullable();
            $table->string('titulo_pagina')->nullable();
            $table->text('descricao_pagina')->nullable();
            $this->timestamps($table);
        });

        Schema::create('imagens_cases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('case_cliente_id')->constrained('cases_clientes')->cascadeOnDelete();
            $table->string('imagem');
            $table->string('tipo', 10)->default('imagem');
            $table->string('poster')->nullable();
            $table->string('tamanho', 20)->default('grande');
            $table->boolean('visivel')->default(true);
            $table->integer('ordem')->default(0);
            $table->timestamp('excluido')->nullable();
            $this->timestamps($table);
        });

        Schema::create('clientes', function (Blueprint $table) {
            $table->id();
            $table->string('logo')->nullable();
            $table->boolean('visivel')->default(true);
            $table->integer('ordem')->default(0);
            $table->timestamp('excluido')->nullable();
            $this->timestamps($table);
        });

        Schema::create('clientes_idiomas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cliente_id')->constrained('clientes')->cascadeOnDelete();
            $table->foreignId('idioma_id')->constrained('idiomas');
            $table->string('nome');
            $this->timestamps($table);
        });

        Schema::create('portfolios', function (Blueprint $table) {
            $table->id();
            $table->string('nome')->nullable();
            $table->string('imagem');
            $table->decimal('rotacao', 6, 2)->default(0);
            $table->integer('posicao_x')->default(0);
            $table->integer('posicao_y')->default(0);
            $table->boolean('visivel')->default(true);
            $table->integer('ordem')->default(0);
            $table->timestamp('excluido')->nullable();
            $this->timestamps($table);
        });

        Schema::create('contatos', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('email');
            $table->string('telefone', 50)->nullable();
            $table->string('empresa')->nullable();
            $table->string('cargo')->nullable();
            $table->text('mensagem')->nullable();
            $table->boolean('proposta')->default(false);
            $table->string('token', 64)->nullable()->index();
            $table->timestamp('excluido')->nullable();
            $this->timestamps($table);
        });

        Schema::create('cargos', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $this->timestamps($table);
        });

        Schema::create('curriculos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cargo_id')->nullable()->constrained('cargos')->nullOnDelete();
            $table->string('nome');
            $table->string('email');
            $table->string('whatsapp', 50)->nullable();
            $table->string('arquivo')->nullable();
            $table->string('pretensao')->nullable();
            $table->text('apresentacao')->nullable();
            $table->text('projetos')->nullable();
            $table->string('token', 64)->nullable()->index();
            $table->timestamp('excluido')->nullable();
            $this->timestamps($table);
        });

        Schema::create('redes_sociais', function (Blueprint $table) {
            $table->id();
            $table->foreignId('curriculo_id')->constrained('curriculos')->cascadeOnDelete();
            $table->string('tipo', 50);
            $table->string('link');
            $this->timestamps($table);
        });

        Schema::create('newsletters', function (Blueprint $table) {
            $table->id();
            $table->string('nome')->nullable();
            $table->string('email');
            $this->timestamps($table);
        });
    }

    public function down(): void
    {
        foreach ([
            'newsletters', 'redes_sociais', 'curriculos', 'cargos', 'contatos', 'portfolios',
            'clientes_idiomas', 'clientes', 'imagens_cases', 'cases_clientes_idiomas', 'cases_clientes',
            'imagens', 'conteudos_idiomas', 'conteudos_parametros', 'conteudos',
            'paginas_idiomas', 'paginas', 'idiomas',
        ] as $table) {
            Schema::dropIfExists($table);
        }
    }
};
