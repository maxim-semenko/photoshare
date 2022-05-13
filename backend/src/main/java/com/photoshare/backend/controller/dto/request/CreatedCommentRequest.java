package com.photoshare.backend.controller.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatedCommentRequest {
    private Long postId;
    private Long userId;
    private String content;
}
