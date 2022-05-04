package com.photoshare.backend.repository;

import com.photoshare.backend.entity.Post;
import com.photoshare.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    Page<Post> findAllByUser(Pageable pageable, User user);

    @Query("select post from Post post where post.user in " +
            "(select subscibe.following.id from Subscribe subscibe where subscibe.user =:user )")
    Page<Post> findAllByUserSubscribes(Pageable pageable, @Param("user") User user);
}
