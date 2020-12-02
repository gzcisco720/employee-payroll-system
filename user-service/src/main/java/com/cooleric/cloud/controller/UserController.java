package com.cooleric.cloud.controller;

import com.cooleric.cloud.vo.request.UserCreateDto;
import com.cooleric.cloud.entity.User;
import com.cooleric.cloud.exception.JPAOptException;
import com.cooleric.cloud.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Email;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/add")
    public User addUser(@Valid @RequestBody UserCreateDto dto) throws JPAOptException {
        return userService.add(dto);
    }

    @GetMapping("/user/{email}")
    public User findUserByEmail(@PathVariable @Email String email) throws JPAOptException {
        return userService.findUserByEmail(email);
    }
}
