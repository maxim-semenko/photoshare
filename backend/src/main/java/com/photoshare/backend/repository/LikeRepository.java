package com.photoshare.backend.repository;

import com.photoshare.backend.entity.Like;
import com.photoshare.backend.entity.Post;
import com.photoshare.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {

    Optional<Like> findByPostAndUser(Post post, User user);
}
