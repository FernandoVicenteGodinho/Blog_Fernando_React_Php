<?php

namespace Database\Factories;

use App\Models\Authors;
use App\Models\Posts;
use App\Models\Tags;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Posts>
 */
class PostsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence,
            'body' => $this->faker->paragraph,
            'authors_id' => Authors::factory(),
            'resume' => $this->faker->paragraphs(2, true),
        ];
    }
    public function withTags(int $count = 1)
    {
        return $this->hasAttached(
            Tags::factory()->count($count),
            [],
            'tags'
        );
    }
    public function withExistingTags(int $count = 3)
    {
        return $this->afterCreating(function (Posts $post) use ($count) {
            $tags = Tags::inRandomOrder()->take($count)->pluck('id');
            $post->tags()->attach($tags);
        });
    }

}
