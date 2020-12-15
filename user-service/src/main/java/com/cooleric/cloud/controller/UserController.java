package com.cooleric.cloud.controller;

import com.cooleric.cloud.service.UserEmailService;
import com.cooleric.cloud.vo.CommonResponse;
import com.cooleric.cloud.vo.request.ResetVerifyRequest;
import com.cooleric.cloud.vo.request.UpdatePasswordRequest;
import com.cooleric.cloud.vo.request.UserCreateRequest;
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
    private final UserEmailService userEmailService;
    @PostMapping("/add")
    public User addUser(@Valid @RequestBody UserCreateRequest dto) throws JPAOptException {
        return userService.add(dto);
    }

    @GetMapping("/user/{email}")
    public User findUserByEmail(@PathVariable @Email String email) throws JPAOptException {
        return userService.findUserByEmail(email);
    }

    @GetMapping("/reset/{email}")
    public void sendMail(@PathVariable String email) {
        userEmailService.sendResetPasswordEmail(email);
    }

    @PostMapping("/reset/verify")
    public CommonResponse<Object> verifyPasswordResetToken(@RequestBody ResetVerifyRequest request) {
        return userService.verifyResetToken(request);
    }
    @PutMapping("/password")
    public User updatePassword(@RequestBody UpdatePasswordRequest request) throws JPAOptException {
        return userService.updatePassword(request);
    }
}
