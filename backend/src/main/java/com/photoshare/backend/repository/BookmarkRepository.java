package com.photoshare.backend.repository;

import com.photoshare.backend.entity.Bookmark;
import com.photoshare.backend.entity.Post;
import com.photoshare.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    Optional<Bookmark> findByPost(Post post);

    Optional<Bookmark> findByPostAndUser(Post post, User user);
}
