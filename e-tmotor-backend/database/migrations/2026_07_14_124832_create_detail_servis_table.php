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
    Schema::create('detail_servis', function (Blueprint $table) {
        $table->id();
        $table->foreignId('servis_id')->constrained('servis')->onDelete('cascade');
        $table->foreignId('sparepart_id')->constrained('spareparts')->onDelete('cascade');
        $table->integer('qty')->unsigned();
        $table->decimal('harga', 12, 2);
        $table->decimal('subtotal', 12, 2);
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_servis');
    }
};
