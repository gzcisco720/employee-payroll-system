package com.cooleric.cloud.controller;

import com.cooleric.cloud.dto.request.UserCreateDto;
import com.cooleric.cloud.entity.User;
import com.cooleric.cloud.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Email;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/add")
    public ResponseEntity<User> addUser(@Valid @RequestBody UserCreateDto dto) {
        return ResponseEntity.ok(userService.add(dto));
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<User> findUserByEmail(@PathVariable @Email String email) {
        User userByEmail = userService.findUserByEmail(email);
        if(null == userByEmail) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(userByEmail);
        }
    }
}
