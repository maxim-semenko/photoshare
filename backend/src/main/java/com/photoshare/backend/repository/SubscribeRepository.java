package com.photoshare.backend.repository;

import com.photoshare.backend.entity.Subscribe;
import com.photoshare.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubscribeRepository extends JpaRepository<Subscribe, Long> {

    Page<Subscribe> findAllByUser(Pageable pageable, User user);

    Page<Subscribe> findAllByFollowing(Pageable pageable, User following);
}
