package com.cooleric.cloud.vo.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdatePasswordRequest {
    private String email;
    private String password;
}
