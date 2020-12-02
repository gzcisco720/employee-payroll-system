package com.cooleric.cloud.jwt;

import lombok.Data;

@Data
public class AuthenticationRequest {
    private String email;
    private String password;
}
