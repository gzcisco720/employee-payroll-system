package com.cooleric.cloud.service;

import com.alibaba.fastjson.JSON;
import com.cooleric.cloud.constant.UserServiceRedisKey;
import com.cooleric.cloud.vo.CommonResponse;
import com.cooleric.cloud.vo.request.ResetVerifyRequest;
import com.cooleric.cloud.vo.request.UpdatePasswordRequest;
import com.cooleric.cloud.vo.request.UserCreateRequest;
import com.cooleric.cloud.entity.User;
import com.cooleric.cloud.exception.JPAOptException;
import com.cooleric.cloud.mapper.UserMapper;
import com.cooleric.cloud.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
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
    private final StringRedisTemplate redisTemplate;

    public User add(UserCreateRequest dto) throws JPAOptException {
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

    public CommonResponse<Object> verifyResetToken(ResetVerifyRequest request) {
        String key = UserServiceRedisKey.PASSWORD_RESET+request.getEmail();
        String s = redisTemplate.opsForValue().get(key);
        CommonResponse<Object> response = new CommonResponse<>();
        response.setData(null);
        if (null==s||!s.equals(request.getToken())) {
            response.setCode(-1);
            response.setMessage("Code is invalid or expired");
        } else {
            response.setCode(0);
            response.setMessage("code is verified");
        }
        return response;
    }

    public User updatePassword(UpdatePasswordRequest dto) throws JPAOptException {
        try {
            Optional<User> userByEmail = userRepo.findUserByEmail(dto.getEmail());
            if (userByEmail.isPresent()) {
                User user = userByEmail.get();
                user.setPassword(dto.getPassword());
                User save = userRepo.save(user);
                redisTemplate.delete(UserServiceRedisKey.PASSWORD_RESET+dto.getEmail());
                return save;
            }
            return null;
        } catch (Exception e) {
            throw new JPAOptException(String.format("Error happened when save user: %s", e.getCause().getCause().getMessage()));
        }
    }
}
