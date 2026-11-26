<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Models\CaseCliente;
use App\Models\ImagemCase;

use Illuminate\Http\Request;
use Inertia\Inertia;

use Carbon\Carbon;
use Illuminate\Support\Facades\File;

class ImagensCasesController extends Controller
{
    const VIDEO_MAX_BYTES = 20 * 1024 * 1024;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        if (!$id) {
            return redirect()->route('Manager.Cases.index', [], 301);
        }

        $caseCliente = CaseCliente::query()
            ->where([
                'excluido' => NULL,
                'id' => $id
            ])
            ->with([
                'casesClientesIdiomas' => function ($q) {
                    $q->whereHas('idiomas', function ($r) {
                        $r->Where('padrao', true);
                    })
                        ->orderBy('idioma_id', 'DESC');
                }
            ])
            ->with([
                'imagensCases' => function ($q) {
                    $q->where([
                        'excluido' => NULL
                    ])
                        ->orderBy('ordem', 'ASC')
                        ->orderBy('id', 'DESC');
                }

            ])
            ->first();

        if (!$caseCliente) {
            return redirect()->route('Manager.Cases.index', [], 301);
        }

        return Inertia::render('Manager/Cases/Imagens/index', [
            'caseCliente' => $caseCliente,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function novo(Request $request, $id)
    {
        if ($request->ajax()) {
            $caseCliente = CaseCliente::query()
                ->where([
                    'excluido' => NULL,
                    'id' => $id
                ])
                ->first();

            if (!$caseCliente) {
                return redirect()->route('Manager.Cases.index', [], 301);
            }

            $request->validate([
                'images' => 'required|array',
                'images.*.img' => 'required|file|mimetypes:image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime',
                'images.*.poster' => 'nullable|file|mimetypes:image/jpeg,image/png,image/webp|max:5120',
            ], [
                'images.*.img.mimetypes' => 'Formato não suportado. Envie JPG, PNG, WEBP, MP4, WEBM ou MOV.',
            ]);

            foreach ($request->file('images') as $key => $image) {
                $isVideo = str_starts_with((string) $image['img']->getMimeType(), 'video/');

                if ($isVideo && $image['img']->getSize() > self::VIDEO_MAX_BYTES) {
                    return redirect()->back()->withErrors(["images.$key.img" => 'Os vídeos não podem passar de 20MB.']);
                }
            }

            File::ensureDirectoryExists(public_path('content/cases/videos/'));

            foreach ($request->file('images') as $image) {
                $isVideo = str_starts_with((string) $image['img']->getMimeType(), 'video/');

                $imagem = new ImagemCase;

                $imagem->imagem = md5(uniqid((string) rand(), true)) . '.' . strtolower($image['img']->extension());
                $imagem->tipo = $isVideo ? 'video' : 'imagem';

                if ($isVideo && !empty($image['poster'])) {
                    $imagem->poster = md5(uniqid((string) rand(), true)) . '.' . strtolower($image['poster']->extension());
                }

                $imagem->case_cliente_id = $caseCliente->id;
                $imagem->tamanho = 'grande';

                $response = $imagem->save();

                if ($response) {
                    $image['img']->move(public_path($isVideo ? 'content/cases/videos/' : 'content/cases/images/'), $imagem->imagem);

                    if ($imagem->poster) {
                        $image['poster']->move(public_path('content/cases/images/'), $imagem->poster);
                    }
                } else {
                    return redirect()->back()->with('message', ['type' => 'error', 'msg' => 'Erro ao salvar imagem']);
                }
            }

            return redirect()->back()->with('message', ['type' => 'success', 'msg' => 'Imagens adicionadas com sucesso!']);
        }

        return redirect()->back();
    }

    /**
     * Update the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function tamanho(Request $request, $id)
    {
        if ($request->ajax()) {
            if (!$id) {
                return $request->header('referer');
            }

            $imagem = ImagemCase::query()
                ->where([
                    'excluido' => NULL,
                    'id' => $id
                ])
                ->update([
                    'tamanho' => $request->tamanho
                ]);

            if ($imagem == true) {
                return redirect()->back()->with('message', ['type' => 'success', 'msg' => 'Registro alterado com sucesso.']);
            } else {
                return redirect()->back()->with('message', ['type' => 'error', 'msg' => 'Não foi possível alterar o registro.']);
            }
        }
    }

    /**
     * Set the specified resource as deleted.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function excluir(Request $request, $id)
    {
        if ($request->ajax()) {
            if (!$id) {
                return $request->header('referer');
            }

            $exclusao = ImagemCase::query()
                ->where([
                    'excluido' => NULL,
                    'id' => $id
                ])
                ->update([
                    'excluido' => Carbon::now()
                ]);

            if ($exclusao == true) {
                return redirect()->back()->with('message', ['type' => 'alert', 'msg' => 'Registro excluído com sucesso.']);
            } else {
                return redirect()->back()->with('message', ['type' => 'error', 'msg' => 'Não foi possível excluir o registro.']);
            }
        }
    }

    /**
     * Set the specified resource to visible/invisible.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function visibilidade(Request $request, $id)
    {
        if ($request->ajax()) {
            if (!$id) {
                return redirect()->back()->with(['type' => 'error', 'message' => 'Registro não encontrado!']);
            }

            $response = ImagemCase::query()
                ->where([
                    'id' => $id,
                    'excluido' => NULL
                ])
                ->first();

            if (!$response) {
                return redirect()->back()->with('message', ['type' => 'error', 'msg' => 'Registro não encontrado!']);
            }

            $response->visivel = 1 - $response->visivel;
            $response->save();

            if ($response) {
                return redirect()->back()->with('message', ['type' => 'success', 'msg' => 'Visibilidade alterada com sucesso!']);
            } else {
                return redirect()->back()->with('message', ['type' => 'error', 'msg' => 'Visibilidade não alterada!']);
            }
        }

        return $request->header('referer');
    }

    /**
     * Update the order of the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function ordenar(Request $request)
    {
        if ($request->ajax()) {
            $erros = [];

            if ($request->odr && is_array($request->odr)) {
                foreach ($request->odr as $key => $item) {
                    $imagemId = is_array($item) ? ($item['id'] ?? null) : $item;
                    $ordem = is_array($item) ? ($item['ordem'] ?? $key) : $key;

                    if (!is_numeric($imagemId) || !is_numeric($ordem)) {
                        $erros[] = $item;
                        continue;
                    }

                    ImagemCase::query()
                        ->where([
                            'excluido' => NULL,
                            'id' => (int) $imagemId
                        ])
                        ->update([
                            'ordem' => (int) $ordem,
                        ]);
                }
            }

            if (!count($erros)) {
                return redirect()->back()->with('message', ['type' => 'success', 'msg' => 'Registros reordenados com sucesso!']);
            } else {
                return redirect()->back()->with('message', ['type' => 'error', 'msg' => 'Registros não reordenados, tente novamente mais tarde!']);
            }
        }

        return redirect()->back();
    }
}
