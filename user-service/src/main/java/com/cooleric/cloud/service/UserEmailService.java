package com.cooleric.cloud.service;

import com.cooleric.cloud.config.EmailConfig;
import com.cooleric.cloud.constant.UserServiceRedisKey;
import com.cooleric.cloud.entity.User;
import com.cooleric.cloud.util.MD5Util;
import com.cooleric.cloud.util.RandomUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.sql.Timestamp;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class UserEmailService {
    private final StringRedisTemplate redisTemplate;
    private final EmailConfig emailConfig;
    private final TemplateEngine templateEngine;
    private final RandomUtils randomUtils;
    private final UserService userService;
    private final EmailService emailService;

    public String build(String message) {
        Context context = new Context();
        context.setVariable("message", message);
        return templateEngine.process("mailTemplate", context);
    }

    public String generateMailUrl(String email) {
        String redisKey = String.format("%s%s", UserServiceRedisKey.PASSWORD_RESET, email);
        try {
            User userByEmail = userService.findUserByEmail(email);
            String key = randomUtils.GenerateRandomNumber(6) + "";
            Timestamp outDate = new Timestamp(System.currentTimeMillis() + (long) (10 * 60 * 1000));
            long outtimes = outDate.getTime();
            String sid = userByEmail.getEmail() + "&" + key + "&" + outtimes;
            redisTemplate.opsForValue().set(redisKey, MD5Util.md5Encrypt32Lower(sid));
            redisTemplate.expire(redisKey, 10, TimeUnit.MINUTES);
            return String.format("%s%s%s%s%s", emailConfig.getFrontendUrl(), "/update_password?sid=",MD5Util.md5Encrypt32Lower(sid),"&email=",userByEmail.getEmail());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Async("getAsyncExecutor")
    public void sendResetPasswordEmail(String email) {
        String mailUrl = generateMailUrl(email);
        emailService.sendMail(email,"Password Reset Link", build(mailUrl));
    }
}
