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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained('bookings');
            $table->foreignId('passenger_id')->constrained('passengers');
            $table->decimal('amount', 15, 2);
            $table->enum('payment_method', ['credit_card', 'bank_transfer', 'e-wallet', 'cash']);
            $table->enum('payment_status', ['pending', 'paid', 'failed', 'refunded']);
            $table->string('transaction_id', 50);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
