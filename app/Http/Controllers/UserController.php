<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Models\User;
use App\Service\AuthService;
use Exception;
use GuzzleHttp\Promise\Create;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function CreateUser(CreateUserRequest $request)
    {
        try {
            $dados = $request->all();
            AuthService::CreateUser($dados);
            return $this->SendOK();
        } catch (Exception $e) {
            return $this->SendError($e->getMessage());
        }
    }

    public function Login(Request $request)
    {
        try {
            $dados = $request->all();
            $user = AuthService::Login($dados);
            $token = AuthService::CreateToken($user);

            $data = [
                'name' => $user->name,
                'email' => $user->email,
                'token' => $token,
            ];
            return $this->SendData($data);
        } catch (Exception $e) {
            return $this->SendError($e);
        }
    }
    public function teste(Request $request)
    {
        try {

            return $this->SendOK();
        } catch (Exception $e) {
            return $this->SendError($e->getMessage());
        }
    }
}
