<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('tagline');
            $table->text('description');
            $table->string('status')->default('concept');
            $table->string('tags')->default('');
            $table->string('link')->nullable();
            $table->string('screenshot_url')->nullable();
            $table->string('screenshot_disk')->nullable();
            $table->string('screenshot_path')->nullable();
            $table->string('screenshot_mime_type')->nullable();
            $table->boolean('embed_live')->default(false);
            $table->string('github_repo')->nullable();
            $table->boolean('featured')->default(false);
            $table->text('deliverables')->nullable();
            $table->text('case_study')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
