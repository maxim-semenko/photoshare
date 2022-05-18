package com.photoshare.backend.entity.chat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.photoshare.backend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String chatCode;

    @ManyToOne
    private User sender;

    @ManyToOne
    private User recipient;

    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<ChatMessage> chatMessages = new ArrayList<>();

}
