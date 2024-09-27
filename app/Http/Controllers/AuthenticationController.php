<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Models\User;
use App\Service\AuthService;
use Carbon\Carbon;
use Exception;
use GuzzleHttp\Promise\Create;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticationController extends Controller
{
    public function ValidatorToken()
    {
        try {
            $user = Auth::user();
            $token = $user->tokens()
                ->where('name', "auth_token")
                ->where('created_at', '>' , Carbon::now()->subHours(8))
                ->first();
            if ($token) {
                return $this->SendOK();
            }else{
                $user->tokens()->where('name', 'auth_token')->delete();
                abort(Response::HTTP_UNAUTHORIZED, 'Token is expired.');
            }
        } catch (Exception $e) {
            return $this->SendError($e);
        }
    }

    public function Logout()
    {
        try {
            $user = Auth::user();
            $user->tokens()->where('name', 'auth_token')->delete();
            return $this->SendOK();
        } catch (Exception $e) {
            return $this->SendError($e);
        }
    }

}
