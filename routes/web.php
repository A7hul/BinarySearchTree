<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'NodeController@index')->name('index');
Route::post('/store', 'NodeController@store')->name('store');
Route::post('/destroy', 'NodeController@destroy')->name('destroy');
