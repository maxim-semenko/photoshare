package com.photoshare.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
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
import javax.persistence.OneToOne;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@ToString
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
    private String image;

    @NotNull
    @CreatedDate
    private Date registerDate;

    @OneToOne(cascade = {CascadeType.ALL}, fetch = FetchType.LAZY)
    @JsonIgnore
    private Bookmark bookmark;

    @OneToMany(mappedBy = "user")
    private Set<Post> posts = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "users_m2m_roles",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "role_id")}
    )
    private Set<Role> roles = new HashSet<>();

}
