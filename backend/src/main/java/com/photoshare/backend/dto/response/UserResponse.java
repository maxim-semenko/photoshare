package com.photoshare.backend.dto.response;

import com.photoshare.backend.entity.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
public class UserResponse {
    private Long id;
    private String username;
    private String firstname;
    private String lastname;
    private String email;
    private String image;
    private String about;
    private Set<String> roles;

    public static UserResponse mapUserToDTO(User user) {
        UserResponse userResponse = new UserResponse();
        Set<String> roles = user.getRoles().stream()
                .map(role -> role.getName().name())
                .collect(Collectors.toSet());

        userResponse.setId(user.getId());
        userResponse.setUsername(user.getUsername());
        userResponse.setFirstname(user.getFirstname());
        userResponse.setLastname(user.getLastname());
        userResponse.setEmail(user.getEmail());
        userResponse.setImage(user.getImage());
        userResponse.setAbout(user.getAbout());
        userResponse.setRoles(roles);

        return userResponse;
    }

    public static Page<UserResponse> mapListUserToDTO(final Page<User> users) {
        return new PageImpl<>(users.stream()
                .map(UserResponse::mapUserToDTO)
                .collect(Collectors.toList()), users.getPageable(), users.getTotalElements());

    }
}
