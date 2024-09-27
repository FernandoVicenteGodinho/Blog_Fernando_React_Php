<?php
namespace App\Service;

use App\Models\Post;
use App\Models\Posts;
use App\Models\Tags;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;

class PostService
{
    public static function CreatePost($dados)
    {
        try {
            $user = Auth::user();
            $post = new Posts();
            $post->title = $dados['title'];
            $post->body = $dados['body'];
            $post->resume = $dados['resume'];
            $post->user()->associate($user);
            $post->save();

            if (isset($dados['tags']) && is_array($dados['tags'])) {
                $tags = [];
                foreach ($dados['tags'] as $tagName) {
                    if (!empty(trim($tagName))) {
                        $tag = Tags::firstOrCreate(['description' => trim($tagName)]);
                        $tags[] = $tag->id;
                    }
                }
                $post->tags()->sync($tags);
            }

            return $post;
        } catch (Exception $e) {
            return $e;
        }
    }

}
