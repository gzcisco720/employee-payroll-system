package com.cooleric.cloud.service;

import com.alibaba.fastjson.JSON;
import com.cooleric.cloud.dto.request.UserCreateDto;
import com.cooleric.cloud.entity.User;
import com.cooleric.cloud.mapper.UserMapper;
import com.cooleric.cloud.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepo userRepo;
    private final UserMapper userMapper;

    public User add(UserCreateDto dto) {
        try {
            User user = userMapper.fromUserCreateDto(dto);
            log.info(String.format("save User: %s", JSON.toJSONString(user)));
            return userRepo.save(user);
        } catch (Exception e) {
            log.error(String.format("Error happened when save user: %s", e.getMessage()));
            return null;
        }
    }

    public User findUserByEmail(String email) {
        return userRepo.findUserByEmail(email).orElse(null);
    }
}
