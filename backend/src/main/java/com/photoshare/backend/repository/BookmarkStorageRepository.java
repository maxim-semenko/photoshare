package com.photoshare.backend.repository;

import com.photoshare.backend.entity.BookmarkStorage;
import com.photoshare.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookmarkStorageRepository extends JpaRepository<BookmarkStorage, Long> {

    Optional<BookmarkStorage> findByUser(User user);
}
