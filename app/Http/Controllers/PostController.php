<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Posts;
use App\Service\PostService;
use Exception;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function CreatePost(Request $request)
    {
        try {
            $dados = $request->all();
            $post = PostService::CreatePost($dados);
            return $this->SendData($post);
        } catch (Exception $e) {
            return ($e);
        }
    }
    public function GetPosts()
    {
        try {
            $user = auth()->user();

            if ($user && $user->permission == 2) {
                $posts = Posts::where(function ($query) use ($user) {
                    $query->where('status', true)
                          ->orWhere(function ($query) use ($user) {
                              $query->where('status', false)
                                    ->where('user_id', $user->id);
                          });
                })
                ->with('user')
                ->get();
            } else if ($user) {
                $posts = Posts::with('user')->all();
            } else {
                $posts = Posts::where('status', true)->with('user')->get();
            }

            return $this->SendData($posts);
        } catch (Exception $e) {
            return ($e);
        }
    }
}
