package com.devoteam.pmo.controller;

import com.devoteam.pmo.entity.Role;
import com.devoteam.pmo.entity.User;
import com.devoteam.pmo.repository.RoleRepository;
import com.devoteam.pmo.repository.UserRepository;
import com.devoteam.pmo.service.UserService;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@CrossOrigin

public class UserController {

    @Autowired

    private UserService userService;
    @Autowired

    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleDao;

    @PostConstruct
    public void createAdmin(){
       Role adminRole = roleDao.findById("Admin").orElse(null);
        Role pmoRole = roleDao.findById("pmo").orElse(null);
        Role pmRole = roleDao.findById("pm").orElse(null);
        Role consultantRole = roleDao.findById("consultant").orElse(null);
        if (adminRole == null){
            Role roleadmin = new Role();
            roleadmin.setRoleName("Admin");
            roleadmin.setRoleDescription("Admin");
            roleDao.save(roleadmin);
        } else {
            System.out.println("pmorole is already exist");
        }
        if (pmoRole == null){
           Role rolepmo = new Role();
            rolepmo.setRoleName("pmo");
            rolepmo.setRoleDescription("pmo");
           roleDao.save(rolepmo);
        } else {
            System.out.println("pmorole is already exist");
        }
        if (pmRole == null){
            Role rolepm = new Role();
            rolepm.setRoleName("pm");
            rolepm.setRoleDescription("pm");
            roleDao.save(rolepm);
        } else {
            System.out.println("pmrole is already exist");
        }
        if (consultantRole == null){
            Role roleconsultant = new Role();
            roleconsultant.setRoleName("consultant");
            roleconsultant.setRoleDescription("consultant");
            roleDao.save(roleconsultant);
        } else {
            System.out.println("consultantRole is already exist");
        }

         User admin = new User();
         admin.setUserName("admin");
         admin.setUserFirstName("admin");
         admin.setUserLastName("admin");
         admin.setUserEmail("admin@gmail.com");
         admin.setUserPassword(userService.getEncodedPassword("adminadmin"));
        Role role = roleDao.findById("Admin").orElseThrow(() -> new RuntimeException("Role not found"));
        Set<Role> userRoles = new HashSet<>();
        userRoles.add(role);
        admin.setRole(userRoles);
        userRepository.save(admin);

    }
    @GetMapping("/forAdmin")
    @PreAuthorize("hasRole('Admin')")
    public String forAdmin() {
        return "this accessible for admin only";


    }
    @PostMapping("/existByusername")
    public boolean ExistsByUsername( @RequestBody String username){
       return  userService.ExitsByUsername(username);
    }
    @GetMapping("/consultants")
    public List<User> findUsersWithAdminRole() {
        return userRepository.findUsersWithAdminRole();
    }
    @GetMapping("/pms")
    public List<User> findUsersWithPmRole() {
        return userRepository.findUsersWithPmRole();
    }

    @GetMapping("/forUser")
    @PreAuthorize("hasRole('User')")
    public String forUser() {
        return "this accessible for user only";
    }



    @PostMapping("/createUserWithRole")
    public ResponseEntity<User> createUserWithRole
            (@RequestBody User userDto, @RequestParam String roleName) {
        User user = userService.createUserWithRole(userDto, roleName);

        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }


    @GetMapping("/users-with-roles")
    public List<User> getAllUsersWithRoles() {
        return userService.getAllUsersWithRoles();
    }



    @GetMapping("/allUsers")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }




    @DeleteMapping("/delete/{userName}")
    public ResponseEntity<?> deleteUser(@PathVariable String userName) {
        userService.deleteUser(userName);
        return ResponseEntity.ok().build(); // returns HTTP 200 on successful deletion
    }

    @PostMapping("/users/{userId}/projects/{projectId}")
    public ResponseEntity<?> assignProjectToUser(@PathVariable String userId, @PathVariable Long projectId) {
        userService.assignProjectToUser(userId, projectId);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/users/with-projects")
    public List<User> getUsersWithProjects() {
        List<User> users = userRepository.findAll();

        for (User user : users) {
            Hibernate.initialize(user.getProjects());
        }

        return users;
    }


}
