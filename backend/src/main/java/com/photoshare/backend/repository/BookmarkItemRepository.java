package com.photoshare.backend.repository;

import com.photoshare.backend.entity.BookmarkItem;
import com.photoshare.backend.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookmarkItemRepository extends JpaRepository<BookmarkItem, Long> {

    Optional<BookmarkItem> findByPost(Post post);
}
