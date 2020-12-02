package com.cooleric.cloud.feign;

import com.cooleric.cloud.vo.CommonResponse;
import com.cooleric.cloud.vo.UserInfo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.validation.constraints.Email;

@FeignClient(value = "eureka-client-user-service")
public interface UserClient {
    @GetMapping("/user-service/user/{email}")
    CommonResponse<UserInfo> findUserByEmail(@PathVariable @Email String email);
}
