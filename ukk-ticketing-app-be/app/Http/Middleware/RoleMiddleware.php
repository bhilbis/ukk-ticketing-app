<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        try { 
            if (!$request->bearerToken()) {
                return response()->json(['error' => 'Token not provided'], 401);
            }
            
            $user = JWTAuth::parseToken()->authenticate(); 
            
            if (!$user) {
                return response()->json(['error' => 'User not found'], 401);
            }
    
            if (!in_array($user->role, $roles)) { 
                return response()->json(['error' => 'Forbidden'], 403); 
            }
        } catch (JWTException $e) { 
            return response()->json(['error' => $e->getMessage()], 401); 
        } 

        return $next($request);
    }
}
