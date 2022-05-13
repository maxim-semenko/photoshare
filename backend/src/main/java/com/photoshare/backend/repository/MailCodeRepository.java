package com.photoshare.backend.repository;


import com.photoshare.backend.entity.User;
import com.photoshare.backend.entity.mail.MailCode;
import com.photoshare.backend.entity.mail.MailTypeMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * MailCodeRepository for working with entity {@link MailCode}.
 *
 * @author Maxim Semenko
 * @version 1.0
 */
@Repository
public interface MailCodeRepository extends JpaRepository<MailCode, Long> {
    /**
     * Method that return last mail code by userId and type of mail code.
     *
     * @param user            user {@link User}
     * @param mailTypeMessage type of mail code message {@link MailTypeMessage}
     * @return mail code {@link MailCode}
     */
    @Query("select mailcode from MailCode mailcode " +
            "where mailcode.id = (select max(id) from MailCode ) " +
            "and mailcode.user =:user and mailcode.mailTypeMessage =:mailTypeMessage")
    Optional<MailCode> getLastByUserAndType(@Param("user") User user,
                                            @Param("mailTypeMessage") MailTypeMessage mailTypeMessage);

    /**
     * Method that deletes all mail codes by user.
     *
     * @param user user whose mail codes should delete
     */
    void deleteAllByUser(User user);

}
