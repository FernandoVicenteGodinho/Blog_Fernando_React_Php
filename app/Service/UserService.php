<?php

namespace App\Service;

use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;

class UserService
{
    public static function GetUser()
    {
        try {
            $user = Auth::user();
            return $user;
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }
    public static function UpdateUser($dados)
    {
        try {
            $user = Auth::user();
            $user->fill([
                'name' => $dados['name'],
                'email' => $dados['email'],
                'profession' => $dados['profession'],
                'website' => $dados['website'],
                'linkedin' => $dados['linkedin'],
                'github' => $dados['github']
            ]);
            $user->save();
            return $user;
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }
}
