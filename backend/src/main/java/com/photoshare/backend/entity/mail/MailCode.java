package com.photoshare.backend.entity.mail;

import com.photoshare.backend.entity.BaseEntity;
import com.photoshare.backend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MailCode extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private Integer code;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "mail_type_message_id", referencedColumnName = "id")
    private MailTypeMessage mailTypeMessage;

    @Builder.Default
    private Boolean isValid = true;

    @Builder.Default
    private Integer countAttempts = 0;

}
