<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8">
    <title>Novo contato pelo site</title>
</head>
<body style="margin:0; padding:0; background:#f5f5f5; font-family:Arial, Helvetica, sans-serif; color:#161616;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5; padding:30px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border:1px solid #e5e5e5;">
                    <tr>
                        <td style="background:#000000; color:#ffffff; padding:24px 30px; font-size:20px; font-weight:bold; text-transform:uppercase;">
                            Novo contato pelo site
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:30px; font-size:14px; line-height:1.6;">
                            <p style="margin:0 0 20px; font-size:16px;">Um novo contato veio através do site. Confira os dados abaixo:</p>

                            @if ($proposta)
                                <p style="margin:0 0 20px; padding:10px 14px; background:#f5f5f5; border-left:3px solid #000000; font-weight:bold;">
                                    Solicitou uma proposta.
                                </p>
                            @endif

                            <p style="margin:0 0 10px;"><strong>Nome:</strong> {{ $nome }}</p>
                            <p style="margin:0 0 10px;"><strong>E-mail:</strong> <a href="mailto:{{ $email }}" style="color:#161616;">{{ $email }}</a></p>
                            @if ($telefone)
                                <p style="margin:0 0 10px;"><strong>Telefone:</strong> {{ $telefone }}</p>
                            @endif
                            @if ($empresa)
                                <p style="margin:0 0 10px;"><strong>Empresa:</strong> {{ $empresa }}</p>
                            @endif
                            @if ($cargo)
                                <p style="margin:0 0 10px;"><strong>Cargo:</strong> {{ $cargo }}</p>
                            @endif

                            @if ($mensagem)
                                <p style="margin:20px 0 6px;"><strong>Mensagem:</strong></p>
                                <p style="margin:0;">{!! nl2br(e($mensagem)) !!}</p>
                            @endif
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
