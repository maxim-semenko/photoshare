package com.photoshare.backend.repository;

import com.photoshare.backend.entity.Comment;
import com.photoshare.backend.entity.Post;
import com.photoshare.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    Page<Comment> findAllByPost(Pageable pageable, Post post);

    Optional<Comment> findByPostAndUser(Post post, User user);
}
