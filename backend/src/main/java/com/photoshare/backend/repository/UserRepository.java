package com.photoshare.backend.repository;

import com.photoshare.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Page<User> findAll(Pageable pageable);

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    /**
     * Method that finds all users by username.
     *
     * @param pageable contain any params (size, page, etc)
     * @param username params for search
     * @return page of users
     */
    Page<User> findAllByUsernameContaining(Pageable pageable, String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
