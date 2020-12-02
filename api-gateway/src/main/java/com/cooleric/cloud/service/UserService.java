package com.cooleric.cloud.service;

import com.cooleric.cloud.feign.UserClient;
import com.cooleric.cloud.vo.CommonResponse;
import com.cooleric.cloud.vo.UserInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserClient userClient;
    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        CommonResponse<UserInfo> res = userClient.findUserByEmail(s);
        if(res.getCode() >= 0 && null != res.getData()) {
            return new User(
                    res.getData().getEmail(),
                    res.getData().getPassword(),
                    AuthorityUtils.commaSeparatedStringToAuthorityList(res.getData().getRole()));
        }
        return null;
    }
}
