package com.devoteam.pmo.repository;

import com.devoteam.pmo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    User findByUserName(String userName);
     boolean existsByUserName(String username);
    @Query("SELECT u FROM User u JOIN u.role r WHERE r.roleName = 'consultant'")
    List<User> findUsersWithAdminRole();

    @Query("SELECT u FROM User u JOIN u.role r WHERE r.roleName = 'pm'")
    List<User> findUsersWithPmRole();

    @Query("SELECT DISTINCT u FROM User u JOIN FETCH u.role")
    List<User> findAllWithRoles();
    @Modifying
    @Query("delete from User u where u.userName = ?1")
    void deleteByUsername(String username);
}
