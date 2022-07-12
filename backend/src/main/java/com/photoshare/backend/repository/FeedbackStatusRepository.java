package com.photoshare.backend.repository;

import com.photoshare.backend.entity.FeedbackStatus;
import com.photoshare.backend.entity.enums.FeedbackStatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FeedbackStatusRepository extends JpaRepository<FeedbackStatus, Long> {

    Optional<FeedbackStatus> findByName(FeedbackStatusEnum name);

}
