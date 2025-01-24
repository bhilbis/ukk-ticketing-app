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
        Schema::create('discounts', function (Blueprint $table) {
            $table->id('id');
            $table->enum('discount_type', ['cashback', 'double_deals', 'flash_sale']);
            $table->decimal('min_discount', 5, 2);
            $table->decimal('max_discount', 5, 2);
            $table->integer('minimum_tickets')->default(1);
            $table->foreignId('transport_id')->constrained('transports')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('discounts');
    }
};
