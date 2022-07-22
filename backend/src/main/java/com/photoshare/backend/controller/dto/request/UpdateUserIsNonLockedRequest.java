package com.photoshare.backend.controller.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserIsNonLockedRequest {
    private Boolean isNonLocked;
}