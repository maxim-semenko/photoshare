package com.photoshare.backend.repository;

import com.photoshare.backend.entity.Bookmark;
import com.photoshare.backend.entity.Post;
import com.photoshare.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    Page<Bookmark> findAllByUser(Pageable pageable, User user);

    Optional<Bookmark> findByPostAndUser(Post post, User user);

}
