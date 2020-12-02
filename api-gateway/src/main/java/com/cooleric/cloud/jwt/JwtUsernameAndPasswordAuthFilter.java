package com.cooleric.cloud.jwt;

import com.alibaba.fastjson.JSON;
import com.cooleric.cloud.vo.CommonResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtUsernameAndPasswordAuthFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        AuthenticationRequest user = new ObjectMapper().readValue(request.getInputStream(), AuthenticationRequest.class);
        log.info("attemptAuthentication");
        return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                user.getEmail(),user.getPassword()
        ));
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        String jwtToken = jwtUtils.generateJWTToken((User) authResult.getPrincipal());
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        CommonResponse<String> commonResponse = new CommonResponse<>();
        commonResponse.setCode(0);
        commonResponse.setMessage("Auth Token");
        commonResponse.setData(jwtToken);
        response.getWriter().write(JSON.toJSONString(commonResponse));
    }
}
