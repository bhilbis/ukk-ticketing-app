<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $user = cache()->remember('user_' . JWTAuth::getPayload(JWTAuth::getToken())->get('sub'), 600, function () {
                return JWTAuth::user();
            });

            $request->merge(['auth_user' => $user]);
        } catch (Exception $e) {
            return response()->json(['message' => 'Token tidak valid'], 401);
        }

        return $next($request);
    }
}
