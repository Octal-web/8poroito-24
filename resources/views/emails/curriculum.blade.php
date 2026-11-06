<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8">
    <title>Novo currículo</title>
</head>
<body style="margin:0; padding:0; background:#f5f5f5; font-family:Arial, Helvetica, sans-serif; color:#161616;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5; padding:30px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border:1px solid #e5e5e5;">
                    <tr>
                        <td style="background:#000000; color:#ffffff; padding:24px 30px; font-size:20px; font-weight:bold; text-transform:uppercase;">
                            Novo currículo
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:30px; font-size:14px; line-height:1.6;">
                            <p style="margin:0 0 20px; font-size:16px;">Um novo currículo veio através do site. Confira os dados abaixo:</p>

                            <p style="margin:0 0 20px; padding:10px 14px; background:#f5f5f5; border-left:3px solid #000000; font-weight:bold;">
                                Vaga: {{ $vaga ?: 'Banco de talentos' }}
                            </p>

                            <p style="margin:0 0 10px;"><strong>Nome:</strong> {{ $nome }}</p>
                            <p style="margin:0 0 10px;"><strong>E-mail:</strong> <a href="mailto:{{ $email }}" style="color:#161616;">{{ $email }}</a></p>
                            @if ($whatsapp)
                                <p style="margin:0 0 10px;"><strong>WhatsApp:</strong> {{ $whatsapp }}</p>
                            @endif
                            @if ($cargo)
                                <p style="margin:0 0 10px;"><strong>Cargo de interesse:</strong> {{ $cargo }}</p>
                            @endif
                            @if ($pretensao)
                                <p style="margin:0 0 10px;"><strong>Pretensão salarial:</strong> {{ $pretensao }}</p>
                            @endif

                            @if (count($redesSociais))
                                <p style="margin:20px 0 6px;"><strong>Redes sociais:</strong></p>
                                @foreach ($redesSociais as $rede)
                                    <p style="margin:0 0 4px;">{{ $rede['tipo'] }}: <a href="{{ $rede['link'] }}" style="color:#161616;">{{ $rede['link'] }}</a></p>
                                @endforeach
                            @endif

                            @if ($apresentacao)
                                <p style="margin:20px 0 6px;"><strong>Apresentação:</strong></p>
                                <p style="margin:0;">{!! nl2br(e($apresentacao)) !!}</p>
                            @endif

                            @if ($projetos)
                                <p style="margin:20px 0 6px;"><strong>Projetos:</strong></p>
                                <p style="margin:0;">{!! nl2br(e($projetos)) !!}</p>
                            @endif

                            @if ($curriculo)
                                <p style="margin:20px 0 0; color:#757575;">O arquivo do currículo segue em anexo.</p>
                            @endif
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
