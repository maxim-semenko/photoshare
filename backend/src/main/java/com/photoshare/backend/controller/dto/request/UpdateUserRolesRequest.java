package com.photoshare.backend.controller.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
public class UpdateUserRolesRequest {
    private List<String> roles = new ArrayList<>();
}
