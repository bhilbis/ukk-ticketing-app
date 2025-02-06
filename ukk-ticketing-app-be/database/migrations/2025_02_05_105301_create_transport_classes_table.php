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
        Schema::create('transport_classes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('transport_id')->constrained('transports')->onDelete('cascade');
            $table->string('class_name', 50);
            $table->integer('seat_count');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transport_classes');
    }
};
