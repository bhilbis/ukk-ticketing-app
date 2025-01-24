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
        Schema::create('passengers', function (Blueprint $table) {
            $table->id('id');
            $table->string('email')->unique();
            $table->string('username', 50)->unique();
            $table->string('password');
            $table->string('name_passenger', 100);
            $table->text('address');
            $table->date('birth');
            $table->enum('gender', ['Laki-laki', 'Perempuan']);
            $table->string('telp', 15);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('passengers');
    }
};
