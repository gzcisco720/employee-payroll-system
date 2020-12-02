package com.cooleric.cloud.service;

import com.alibaba.fastjson.JSON;
import com.cooleric.cloud.vo.request.UserCreateDto;
import com.cooleric.cloud.entity.User;
import com.cooleric.cloud.exception.JPAOptException;
import com.cooleric.cloud.mapper.UserMapper;
import com.cooleric.cloud.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepo userRepo;
    private final UserMapper userMapper;
    private final BCryptPasswordEncoder encoder;

    public User add(UserCreateDto dto) throws JPAOptException {
        try {
            User user = userMapper.fromUserCreateDto(dto);
            user.setPassword(encoder.encode(user.getPassword()));
            log.info(String.format("save User: %s", JSON.toJSONString(user)));
            return userRepo.save(user);
        } catch (Exception e) {
            throw new JPAOptException(String.format("Error happened when save user: %s", e.getCause().getCause().getMessage()));
        }
    }

    public User findUserByEmail(String email) throws JPAOptException {
        Optional<User> userByEmail = userRepo.findUserByEmail(email);
        if (userByEmail.isPresent()){
            return userByEmail.get();
        } else {
            throw new JPAOptException("User not found");
        }

    }
}
