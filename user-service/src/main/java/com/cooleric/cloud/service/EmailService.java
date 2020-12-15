package com.cooleric.cloud.service;

import com.cooleric.cloud.config.EmailConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender javaMailSender;
    private final EmailConfig emailConfig;

    public void sendMail(String toEmail, String subject, String content) {
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setFrom(emailConfig.getUsername());
            messageHelper.setTo(toEmail);
            messageHelper.setSubject(subject);
            messageHelper.setText(content, true);
        };
        javaMailSender.send(messagePreparator);
    }
}
