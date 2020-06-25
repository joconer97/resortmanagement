<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\RegisterFormRequest;
use App\Models\User;

class AuthController extends Controller
{
  public function __construct()
 {
     $this->middleware('auth:api', ['except' => ['login','register']]);
 }
 /**
  * Get a JWT via given credentials.
  *
  * @return \Illuminate\Http\JsonResponse
  */
 public function login()
 {
     $credentials = request(['email', 'password','role']);
     if (! $token = auth('api')->attempt($credentials)) {
         return response()->json(['error' => 'Unauthorized'], 401);
     }
     return $this->respondWithToken($token);
 }
 /**
  * Get the authenticated User.
  *
  * @return \Illuminate\Http\JsonResponse
  */
 public function me()
 {
     return response()->json(auth('api')->user());
 }

 public function register(RegisterFormRequest $request)
 {

     $user = new User();
     $user->name = $request->name;
     $user->email = $request->email;
     $user->password = bcrypt($request->password);
     $user->role = $request->role;
     $user->save();

     return response()->json([
       "user" => $user
     ],200);
 }
 /**
  * Log the user out (Invalidate the token).
  *
  * @return \Illuminate\Http\JsonResponse
  */
 public function logout()
 {
     auth('api')->logout();
     return response()->json(['message' => 'Successfully logged out']);
 }
 /**
  * Refresh a token.
  *
  * @return \Illuminate\Http\JsonResponse
  */
 public function refresh()
 {
     return $this->respondWithToken(auth('api')->refresh());
 }
 /**
  * Get the token array structure.
  *
  * @param  string $token
  *
  * @return \Illuminate\Http\JsonResponse
  */
 protected function respondWithToken($token)
 {
     return response()->json([
         'access_token' => $token,
         'user' => $this->guard()->user(),
         'token_type' => 'bearer',
         'expires_in' => auth('api')->factory()->getTTL() * 60
     ]);
 }
 public function guard() {
     return \Auth::Guard('api');
 }
}
