package com.proyecto.inventarios.controller;

import com.proyecto.inventarios.dto.LoginRequest;
import com.proyecto.inventarios.dto.LoginResponse;
import com.proyecto.inventarios.security.CustomUserDetails;
import com.proyecto.inventarios.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            // Autenticar las credenciales provistas (email y contraseña)
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );

            // Obtener el UserDetails del usuario autenticado exitosamente
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

            // Generar el token JWT incluyendo el rol del usuario
            String jwt = jwtUtil.generateToken(userDetails.getUsername(), userDetails.getUsuario().getRol());

            return ResponseEntity.ok(new LoginResponse(jwt));

        } catch (BadCredentialsException e) {
            // Manejar error de credenciales incorrectas (HTTP 401 Unauthorized)
            Map<String, String> response = new HashMap<>();
            response.put("error", "Credenciales incorrectas");
            response.put("mensaje", "El email o la contraseña son incorrectos");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        } catch (Exception e) {
            // Manejar otros errores generales de servidor (HTTP 500)
            Map<String, String> response = new HashMap<>();
            response.put("error", "Error de servidor");
            response.put("mensaje", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
