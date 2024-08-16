<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests, DispatchesJobs;

    public function SendOK()
    {
        $data = [
            'status' => Response::HTTP_OK,
            'statusText' => Response::$statusTexts[Response::HTTP_OK],
            'message' => "'s' : 'success'",
        ];
        return response()->json($data);
    }

    public function SendError($erro)
    {
        if (method_exists($erro, 'getStatusCode')) {
            $codigo = $erro->getStatusCode();
            $detalhes = $erro->getMessage();
            $conteudo = $erro->getHeaders();
        } else {
            $codigo = Response::HTTP_INTERNAL_SERVER_ERROR;
            $detalhes = 'Erro interno do servidor.';
            $conteudo = [];
        }
        $resposta = [
            "status" => $codigo,
            "statusDescricao" => Response::$statusTexts[$codigo],
            "mensagem" => "'e': $detalhes",
            "conteudo" => $conteudo
        ];
        return response()->json($resposta, $codigo);
    }

    public function SendData($data)
    {
        $data = [
            'status' => Response::HTTP_OK,
            'statusText' => Response::$statusTexts[Response::HTTP_OK],
            'message' => "'s' : 'success'",
            'content' => $data,
        ];
        return response()->json($data);
    }


}
