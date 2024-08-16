<?php

namespace App\Service;

use App\Models\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Illuminate\Http\Response;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AuthService
{
    public static function CreateUser($dados)
    {
        $user = new User();
        $user->name = $dados['name'];
        $user->email = $dados['email'];
        $user->password = bcrypt($dados['password']);
        $user->save();
    }

    public static function Login($dados)
    {
        $user = User::findByEmail($dados['email']);
        if ($user) {
            if (password_verify($dados['password'], $user->password)) {
                return $user;
            }
        }
        abort(Response::HTTP_UNAUTHORIZED, 'E-mail or password is incorrect.');
    }

    public static function CreateToken($user)
    {
        $user->tokens()->where('name', 'auth_token')->delete();
        return $user->createToken('auth_token', ['*'] , now()->addHour(8))->plainTextToken;
    }
}
