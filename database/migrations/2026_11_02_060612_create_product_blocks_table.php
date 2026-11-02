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
        Schema::create('product_blocks', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('product_page_id')->constrained()->cascadeOnDelete();
            $table->string('type');
            $table->unsignedInteger('order')->default(0);
            $table->json('data');
            $table->timestamps();
            $table->index(['product_page_id', 'order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_blocks');
    }
};
