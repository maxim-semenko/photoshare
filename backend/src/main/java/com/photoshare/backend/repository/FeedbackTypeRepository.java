package com.photoshare.backend.repository;

import com.photoshare.backend.entity.FeedbackType;
import com.photoshare.backend.entity.enums.FeedbackTypeEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FeedbackTypeRepository extends JpaRepository<FeedbackType, Long> {

    Optional<FeedbackType> findByName(FeedbackTypeEnum name);
}
