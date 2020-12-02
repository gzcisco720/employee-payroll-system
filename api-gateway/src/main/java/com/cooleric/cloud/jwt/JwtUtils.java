package com.cooleric.cloud.jwt;

import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.util.Date;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtUtils {
    private final JwtConfig config;

    public String generateJWTToken(User user) {
        Claims claims = Jwts.claims().setSubject(user.getUsername());
        return  Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date())
                .setExpiration(config.getJwtExp())
                .signWith(config.getSecretKey())
                .compact();
    }

    public boolean validate(String token) {
        try {
            Jwts.parser().setSigningKey(config.getSecretKey()).parseClaimsJws(token);
            return true;
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token - {}", ex.getMessage());
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token - {}", ex.getMessage());
        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token - {}", ex.getMessage());
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty - {}", ex.getMessage());
        }
        return false;
    }

    public String getUsername(String token) {
        return Jwts.parser()
                .setSigningKey(config.getSecretKey())
                .parseClaimsJws(token)
                .getBody()
                .getSubject();

    }
}
