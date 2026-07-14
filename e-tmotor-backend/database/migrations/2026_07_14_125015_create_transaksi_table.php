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
    Schema::create('transaksi', function (Blueprint $table) {
        $table->id();
        $table->foreignId('servis_id')->constrained('servis')->onDelete('cascade');
        $table->string('metode_pembayaran', 50)->nullable();
        $table->enum('status_pembayaran', ['lunas', 'belum_lunas'])->default('belum_lunas');
        $table->dateTime('tanggal_bayar')->nullable();
        $table->decimal('total', 12, 2);
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaksi');
    }
};
