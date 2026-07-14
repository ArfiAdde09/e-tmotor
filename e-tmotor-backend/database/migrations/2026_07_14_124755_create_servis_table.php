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
    Schema::create('servis', function (Blueprint $table) {
        $table->id();
        $table->foreignId('reservasi_id')->constrained('reservasi')->onDelete('cascade');
        $table->string('mekanik')->nullable();
        $table->dateTime('tanggal_mulai')->nullable();
        $table->dateTime('tanggal_selesai')->nullable();
        $table->text('catatan_mekanik')->nullable();
        $table->text('diagnosa')->nullable();
        $table->decimal('total_biaya', 12, 2)->default(0);
        $table->enum('status', ['proses', 'selesai', 'batal'])->default('proses');
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('servis');
    }
};
