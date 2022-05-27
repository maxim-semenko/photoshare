package com.photoshare.backend.repository;

import com.photoshare.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    @Query("select user from User user where user.id in " +
            "(select subscibe.following.id from Subscribe subscibe where subscibe.user =:user)")
    Page<User> findAllFollowersByUser(Pageable pageable, @Param("user") User user);

    @Query("select user from User user where user.id in " +
            "(select subscibe.user.id from Subscribe subscibe where subscibe.following =:user)")
    Page<User> findAllFollowingsByUser(Pageable pageable, @Param("user") User user);

}

