package com.proyecto.inventarios.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity // Permite usar anotaciones como @PreAuthorize si es necesario
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Deshabilitar CSRF dado que no usamos cookies ni sesiones para guardar estado
            .csrf(AbstractHttpConfigurer::disable)
            
            // Configurar políticas de sesiones a STATELESS (sin estado)
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            
            // Configurar reglas de autorización de rutas
            .authorizeHttpRequests(auth -> auth
                // Endpoint público para autenticación (Login)
                .requestMatchers("/api/auth/login").permitAll()
                
                // DOCENTE y ADMINISTRADOR pueden visualizar los inventarios (GET)
                .requestMatchers(HttpMethod.GET, "/api/inventarios/**").hasAnyRole("ADMINISTRADOR", "DOCENTE")
                
                // Cualquier otra ruta y método requiere rol ADMINISTRADOR
                // (incluyendo POST/PUT/DELETE de inventarios y todo sobre marcas, tipos de equipos, estados de equipos y usuarios)
                .anyRequest().hasRole("ADMINISTRADOR")
            )
            
            // Añadir el filtro JWT personalizado antes del filtro de autenticación por defecto
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // Exponer el AuthenticationManager para el proceso de Login
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    // Definición del codificador BCrypt para encriptar contraseñas
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
