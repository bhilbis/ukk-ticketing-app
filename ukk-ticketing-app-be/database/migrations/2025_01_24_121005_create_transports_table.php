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
        Schema::create('transports', function (Blueprint $table) {
            $table->id('id');
            $table->longText('image')->nullable();
            $table->string('code', 50)->unique();
            $table->string('name_transport', 100);
            $table->boolean('has_discount')->default(false);
            $table->text('description');
            $table->foreignId('type_id')->constrained('transport_types')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transports');
    }
};
