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
        Schema::create('product_pages', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('product_site_id')->constrained()->cascadeOnDelete();
            $table->string('slug');
            $table->string('title');
            $table->timestamps();
            $table->unique(['product_site_id', 'slug']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_pages');
    }
};
