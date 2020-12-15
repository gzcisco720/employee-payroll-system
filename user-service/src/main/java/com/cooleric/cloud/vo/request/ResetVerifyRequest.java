package com.cooleric.cloud.vo.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResetVerifyRequest {
    private String token;
    private String email;
}
