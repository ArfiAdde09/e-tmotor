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
        Schema::create('spareparts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kategori_id')->constrained('kategori_sparepart')->onDelete('cascade');
            $table->string('kode_part')->unique();
            $table->string('nama');
            $table->integer('stok')->unsigned()->default(0);
            $table->integer('minimal_stok')->unsigned()->default(5);
            $table->decimal('harga_beli', 12, 2);
            $table->decimal('harga_jual', 12, 2);
            $table->string('supplier')->nullable();
            $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('spareparts');
    }
};
