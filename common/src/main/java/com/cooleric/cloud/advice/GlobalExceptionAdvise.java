package com.cooleric.cloud.advice;

import com.cooleric.cloud.exception.JPAOptException;
import com.cooleric.cloud.vo.CommonResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionAdvise {

    @ExceptionHandler(value = JPAOptException.class)
    public CommonResponse<String> handlerCouponException(
            HttpServletRequest req, JPAOptException ex
    ){
        CommonResponse<String> response = new CommonResponse<>(
                -1, "JPAOptException"
        );
        response.setData(ex.getMessage());
        return response;
    }
}
