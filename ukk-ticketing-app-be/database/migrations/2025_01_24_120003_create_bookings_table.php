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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id('id');
            $table->string('booking_code', 50)->unique();
            $table->date('booking_date');
            $table->string('booking_place', 100);
            $table->foreignId('passenger_id')->constrained('passengers');
            $table->string('seat_code', 10);
            $table->string('destination', 100);
            $table->date('departure_date');
            $table->time('check_in_time');
            $table->time('departure_time');
            $table->decimal('total_payment', 15, 2);
            $table->foreignId('staff_id')->constrained('staff');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
