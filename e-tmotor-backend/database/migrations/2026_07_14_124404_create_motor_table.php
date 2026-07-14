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
        Schema::create('motor', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pelanggan_id')->constrained('pelanggan')->onDelete('cascade');
            $table->string('merk');
            $table->string('tipe');
            $table->year('tahun');
            $table->string('warna');
            $table->string('plat_nomor', 20)->unique();
            $table->string('nomor_rangka')->unique();
            $table->string('nomor_mesin')->unique();
            $table->text('spesifikasi_mesin')->nullable();
            $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('motor');
    }
};
