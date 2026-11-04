<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

/**
 * Dados mínimos para o site e o Manager abrirem após a reconstrução do banco.
 * Os textos dos conteúdos são provisórios: edite-os pelo Manager.
 */
class DatabaseSeeder extends Seeder
{
    private const IMAGEM_PAGINA = 'c9b5915d2a7ab5e1338c5ff5dbd52b06.jpg';

    public function run(): void
    {
        $now = now();
        $ts = ['criado' => $now, 'modificado' => $now];

        $idiomaId = DB::table('idiomas')->insertGetId(['nome' => 'Português', 'codigo' => 'pt', 'padrao' => true] + $ts);

        // Toda rota pública precisa de uma página: o Controller base lê $pagina sem checar null.
        $paginas = [
            ['Home', 'index', 'Agência 8poroito'],
            ['Institucional', 'index', 'Sobre nós | 8poroito'],
            ['Cases', 'index', 'Cases | 8poroito'],
            ['Cases', 'caseCliente', 'Cases | 8poroito'],
            ['Carreiras', 'index', 'Carreiras | 8poroito'],
            ['Carreiras', 'enviar', 'Carreiras | 8poroito'],
            ['Carreiras', 'concluido', 'Currículo enviado | 8poroito'],
            ['Contato', 'index', 'Contato | 8poroito'],
            ['Contato', 'enviar', 'Contato | 8poroito'],
            ['Contato', 'concluido', 'Mensagem enviada | 8poroito'],
            ['Newsletter', 'enviar', 'Newsletter | 8poroito'],
            ['Politicas', 'privacidade', 'Política de Privacidade | 8poroito'],
        ];

        foreach ($paginas as [$controladora, $acao, $titulo]) {
            $paginaId = DB::table('paginas')->insertGetId([
                'controladora' => $controladora,
                'acao' => $acao,
                'imagem' => self::IMAGEM_PAGINA,
            ] + $ts);

            DB::table('paginas_idiomas')->insert([
                'pagina_id' => $paginaId,
                'idioma_id' => $idiomaId,
                'titulo' => $titulo,
                'descricao' => 'Agência 8poroito',
                'titulo_compartilhamento' => $titulo,
                'descricao_compartilhamento' => 'Agência 8poroito',
            ] + $ts);
        }

        // Blocos de conteúdo na ordem em que o front os lê (conteudos[0], conteudos[1], ...).
        // Home: recuperado do HTML do site em produção. Demais páginas: textos provisórios.
        $texto = ['habilitar_titulo' => true, 'habilitar_texto' => true];
        $conteudos = [
            ['Home', 'index', 'Citação', $texto + ['texto_formatado' => true], 'Bill Bernbach', '<p><strong>Ninguém </strong>conta quantos anúncios você veicula;<br>as pessoas lembram da <strong>impressão</strong> que você <strong>causa</strong>.<br>&nbsp;</p>'],
            ['Home', 'index', 'Portfólio', $texto, 'Quer ficar<br />por dentro<br />do nosso<br />trabalho?', 'Siga nosso perfil no Instagram e acompanhe nosso impacto.'],
            ['Institucional', 'index', 'Galeria', ['galeria' => true], null, null],
            ['Carreiras', 'index', 'Topo', $texto, 'Título de carreiras', 'Texto de carreiras.'],
            ['Carreiras', 'index', 'Bloco 1', $texto, 'Título 1', 'Texto 1.'],
            ['Carreiras', 'index', 'Bloco 2', $texto, 'Título 2', 'Texto 2.'],
            ['Carreiras', 'index', 'Bloco 3', $texto, 'Título 3', 'Texto 3.'],
            ['Carreiras', 'index', 'Bloco 4', $texto, 'Título 4', 'Texto 4.'],
            ['Politicas', 'privacidade', 'Política de Privacidade', $texto + ['texto_formatado' => true], 'Política de Privacidade', '<p>Texto da política de privacidade.</p>'],
        ];

        foreach ($conteudos as [$controladora, $acao, $descricao, $parametros, $titulo, $corpo]) {
            $conteudoId = DB::table('conteudos')->insertGetId([
                'controladora' => $controladora,
                'acao' => $acao,
            ] + $ts);

            DB::table('conteudos_parametros')->insert([
                'conteudo_id' => $conteudoId,
                'descricao' => $descricao,
            ] + $parametros);

            DB::table('conteudos_idiomas')->insert([
                'conteudo_id' => $conteudoId,
                'idioma_id' => $idiomaId,
                'titulo' => $titulo,
                'texto' => $corpo,
            ] + $ts);
        }

        // Cases na ordem da página /cases (slug + imagem de grid). Banner só existe para os
        // destaques da home. Títulos inferidos do slug.
        $cases = [
            ['conde-de-foucauld-1', 'afec09718f017cf73966f12cddc44f68.webp', 'cf7f620d259c44dc8ec9ec8f12ac451b.webp', 'Conde de Foucauld'],
            ['new', '625973a7e611f1c2931adec77220d181.webp', 'dbcf489de6a13f4ddd2f0eb418fc7e59.webp', 'New'],
            ['mr-mustache', 'ffefb76314dc3c4bbf23e6834ca40707.webp', null, 'Mr. Mustache'],
            ['casa-brasileira-1', 'cc737255bc694b9b8d950e8680f80819.webp', null, 'Casa Brasileira'],
            ['sicredi-ibiraiaras-rs-mg', '03bf286cd617e8e2706980e0f880186d.webp', '61cfff6f0b8ac2d6f21c451b08a2c277.webp', 'Sicredi Ibiraiaras RS/MG'],
            ['sangue-de-boi', 'db3fc3f6479e759a149bc1c0612dc063.webp', null, 'Sangue de Boi'],
            ['marcus-james', '04f6c44124606c815302ae6fbc9d2e58.webp', null, 'Marcus James'],
            ['sicredi-ibiraiaras-rs-mg-1', '41aff557ae0c9bc31a589219ef8e0a40.webp', null, 'Sicredi Ibiraiaras RS/MG'],
            ['aguia-inox', 'cdf291aeae2bbc069897b3f31ff33ece.webp', null, 'Águia Inox'],
        ];

        foreach ($cases as $ordem => [$slug, $grid, $banner, $titulo]) {
            $caseId = DB::table('cases_clientes')->insertGetId([
                'slug' => $slug,
                'imagem_grid' => $grid,
                'banner' => $banner,
                'destaque' => $banner !== null,
                'visivel' => true,
                'ordem' => $ordem,
            ] + $ts);

            DB::table('cases_clientes_idiomas')->insert([
                'case_cliente_id' => $caseId,
                'idioma_id' => $idiomaId,
                'titulo' => $titulo,
                'titulo_pagina' => $titulo,
            ] + $ts);
        }

        // Logos de clientes, na ordem exibida na home. Os nomes não aparecem no HTML.
        $logos = [
            '5ee285dab81a191b75c48bbc9f79e9a3', 'd56dc75c41e8f68215ef0dd8c69632e8', 'a707eaee9acff32f6c3b60e4c5feeb96',
            '7417f7e6a85e6f1f20f37b9039a9623a', '3fd23e431f0e3f24b678f983ebbb7fd5', '4a52eeedb926b679289cd3588adcde05',
            'bc73339b2776db632768c409897fdc48', '4b45076f9545876f72eafebb32c1e147', '74ce375fa3fe4fc9d2e3fde66377592d',
            'ce08fa0842af8c2238e74ff37398719f', 'f07104e078bb5519bc040dfb2411db77', '1b79bf5f74f47345692853f77f68a441',
            'f491b7e3ebe02c503282937d6f15b204', 'b7ce3feb98e6a0189593ebbc40f64bc9', '541e23327c5518ac69757c88e19fdbbb',
            'c746dc2ca31f54c4b11ee395a8ca8429', '108d93d8d3dd6cb047e305d44c8a75a1', '5aa143fde5ddd244aa12c7b39b52363a',
            '60c0de5b0b970b03be14d8c16f61b995', '55690923b4035e297103f8fe13f3ee1f',
        ];

        foreach ($logos as $ordem => $logo) {
            $clienteId = DB::table('clientes')->insertGetId([
                'logo' => "{$logo}.png",
                'visivel' => true,
                'ordem' => $ordem,
            ] + $ts);

            DB::table('clientes_idiomas')->insert([
                'cliente_id' => $clienteId,
                'idioma_id' => $idiomaId,
                'nome' => 'Cliente ' . ($ordem + 1),
            ] + $ts);
        }

        // Portfólio da home. Posições/rotação recuperadas dos transforms do HTML
        // (capturado com a animação em 72,734%): valor final = transform / 0.72734.
        $portfolios = [
            ['55ff406f771aaac6f3b6ff0af109ed28.jpg', -900, 100, -15],
            ['a1cc506b09be10d1bfeb080a09e409b1.jpg', 900, 100, 15],
            ['9c6c2fe75e35f732b3be127dbbbe394d.jpg', -700, -150, 6],
            ['9092a0ee762165bed54349448d21559c.jpg', 700, -150, -6],
            ['61f030a34c572d5c85cb6cdf64febf7b.jpg', -500, -150, -19],
            ['18dd49d80525d3c8b9280c8600e8e00c.jpg', 500, -150, 19],
        ];

        foreach ($portfolios as $ordem => [$imagem, $x, $y, $rotacao]) {
            DB::table('portfolios')->insert([
                'nome' => 'Portfólio ' . ($ordem + 1),
                'imagem' => $imagem,
                'posicao_x' => $x,
                'posicao_y' => $y,
                'rotacao' => $rotacao,
                'visivel' => true,
                'ordem' => $ordem,
            ] + $ts);
        }

        // IDs fixos: CareerForm.jsx envia o cargo pelo id.
        foreach ([1 => 'Atendimento', 2 => 'Planejamento', 3 => 'Gestor de Tráfego', 4 => 'Redator', 5 => 'Diretor de Arte'] as $id => $nome) {
            DB::table('cargos')->insert(['id' => $id, 'nome' => $nome] + $ts);
        }

        // Usuário do Manager: só é criado se as credenciais vierem do ambiente.
        if (env('ADMIN_EMAIL') && env('ADMIN_PASSWORD')) {
            DB::table('usuarios')->insert([
                'nome' => env('ADMIN_NAME', 'Administrador'),
                'email' => env('ADMIN_EMAIL'),
                'senha' => Hash::make(env('ADMIN_PASSWORD')),
            ] + $ts);
        }
    }
}
