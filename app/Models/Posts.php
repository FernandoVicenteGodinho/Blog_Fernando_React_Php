<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Posts extends Model
{
    use HasFactory;

    protected $table = 'posts';

    protected $fillable = [
        'title', 'body', 'author', 'tags', 'resume',
    ];

    public function author()
    {
        return $this->belongsTo(Authors::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tags::class);
    }
}
