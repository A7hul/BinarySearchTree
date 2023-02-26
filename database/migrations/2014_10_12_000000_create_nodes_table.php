<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNodesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nodes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('node_value');
            // I can do it like this and increase data on each node'
            //but i have a working code done just using js thats why I'm just using node_value and doing all changes on js itself.
            // parent_id INT UNSIGNED,
            // left_child_id INT UNSIGNED,
            // right_child_id INT UNSIGNED,
            // FOREIGN KEY (parent_id) REFERENCES binary_search_tree(id),
            // FOREIGN KEY (left_child_id) REFERENCES binary_search_tree(id),
            // FOREIGN KEY (right_child_id) REFERENCES binary_search_tree(id)
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('nodes');
    }
}
