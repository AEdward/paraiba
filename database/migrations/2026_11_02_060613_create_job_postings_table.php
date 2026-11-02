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
        Schema::create('job_postings', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('title');
            $table->string('category')->default('Engineering');
            $table->string('level')->default('Mid');
            $table->string('location');
            $table->string('type');
            $table->string('work_mode')->default('On-site');
            $table->text('description');
            $table->text('about_role')->nullable();
            $table->text('responsibilities')->nullable();
            $table->text('nice_to_have')->nullable();
            $table->text('how_to_apply')->nullable();
            $table->string('tech_stack')->nullable();
            $table->string('region')->nullable();
            $table->unsignedInteger('positions')->default(1);
            $table->unsignedInteger('min_experience_years')->default(0);
            $table->unsignedInteger('max_experience_years')->default(3);
            $table->unsignedInteger('view_count')->default(0);
            $table->timestamp('expires_at')->nullable();
            $table->string('status')->default('open');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_postings');
    }
};
