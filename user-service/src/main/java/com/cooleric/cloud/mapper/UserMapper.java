package com.cooleric.cloud.mapper;

import com.cooleric.cloud.vo.request.UserCreateDto;
import com.cooleric.cloud.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    User fromUserCreateDto(UserCreateDto dto);
    UserCreateDto fromUserEntity(User entity);
}
