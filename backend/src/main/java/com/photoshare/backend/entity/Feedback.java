package com.photoshare.backend.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@EqualsAndHashCode(callSuper = false)
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    @Size(min = 5, max = 50)
    private String title;

    @NotEmpty
    @Size(min = 20, max = 1024)
    private String content;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "feedback_type_id", referencedColumnName = "id")
    private FeedbackType feedbackType;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "feedbacks_m2m_feedback_statuses",
            joinColumns = {@JoinColumn(name = "feedback_id")},
            inverseJoinColumns = {@JoinColumn(name = "feedback_status_id")}
    )
    @JsonIgnore
    private Set<FeedbackStatus> feedbackStatuses = new HashSet<>();

}
