package com.photoshare.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.photoshare.backend.entity.chat.ChatRoom;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    @Size(min = 7, max = 40)
    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 8, max = 255)
    @JsonIgnore
    private String password;

    @Column(unique = true)
    @Size(min = 2, max = 30)
    @NotBlank
    private String username;

    @Size(min = 2, max = 30)
    private String firstname;

    @Size(min = 2, max = 30)
    private String lastname;

    @Size(min = 2, max = 100)
    private String about;

    @Column(columnDefinition = "MEDIUMBLOB")
    @JsonIgnore
    private String image;

    @NotNull
    @CreatedDate
    private Date registerDate;

    //    @NotNull !!
    private Boolean isAccountNonLocked = true;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<Post> posts = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "users_m2m_roles",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "role_id")}
    )
    @JsonIgnore
    private Set<Role> roles = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<Subscribe> followers = new ArrayList<>();

    @OneToMany(mappedBy = "following", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<Subscribe> following = new ArrayList<>();

    @OneToMany(mappedBy = "sender", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<ChatRoom> chatRoomsSender = new ArrayList<>();

    @OneToMany(mappedBy = "recipient", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<ChatRoom> chatRoomsRecipient = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<Like> likes = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<Bookmark> bookmarks = new ArrayList<>();

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", username='" + username + '\'' +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", about='" + about + '\'' +
                ", image='" + image + '\'' +
                ", registerDate=" + registerDate +
                '}';
    }
}
