<?php

use Illuminate\Http\Request;


Route::group(['prefix' => 'auth'], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    Route::post('register','AuthController@register');


});

Route::group(['middleware' => 'jwt.auth'], function ($router) {
  Route::get('customers','CustomerController@all');
  Route::get('customers/usercustomers/{id}','CustomerController@getUserCustomer');
  Route::get('customers/{id}','CustomerController@get');
  Route::post('customers/new','CustomerController@new');
  Route::put('customers/edit','CustomerController@edit');

});

