package com.devoteam.pmo.service;

import com.devoteam.pmo.entity.Project;
import com.devoteam.pmo.entity.Role;
import com.devoteam.pmo.entity.User;
import com.devoteam.pmo.repository.ProjectRepository;
import com.devoteam.pmo.repository.RoleRepository;
import com.devoteam.pmo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {
    @Autowired
    private UserRepository userDao;
    @Autowired
    private RoleRepository roleDao;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private ProjectRepository projectRepository;



    public User createUserWithRole(User userDto, String roleName) {
        User user = new User();
        user.setUserFirstName(userDto.getUserFirstName());
        user.setUserLastName(userDto.getUserLastName());
        user.setUserName(userDto.getUserName());
        user.setUserEmail(userDto.getUserEmail());
        String plainPassword = userDto.getUserPassword();
        user.setUserPassword(getEncodedPassword(userDto.getUserPassword()));


        Role role = roleDao.findById(roleName).orElseThrow(() -> new RuntimeException("Role not found"));

        Set<Role> userRoles = new HashSet<>();
        userRoles.add(role);
        user.setRole(userRoles);

        userDao.save(user );
        sendEmail(user, plainPassword);

        return user;

    }
    private void sendEmail(User user, String plainPassword) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(user.getUserEmail());
        message.setSubject("Account Created");
        message.setText("Hello " + user.getUserName() + ",\n\n" +
                "Your account has been created successfully.\n" +
                "You can now log in using the following credentials:\n" +
                "Username: " + user.getUserName() + "\n" +
                "Password: " + plainPassword + "\n\n" +
                "Thank you,\n" +
                "Your App Team");

        emailSender.send(message); // Send the email
    }





    public User getUserByUsername(String username) {
        return userDao.findByUserName(username);

    }





    public List<User> getAllUsers() {
        return userDao.findAll();
    }

    public List<User> getAllUsersWithRoles() {
        return userDao.findAllWithRoles();
    }





    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }


    @Transactional
    public void deleteUser(String userName) {
        User user = userDao.findById(userName).orElseThrow(() -> new IllegalArgumentException("User Not Found"));
        Set<Role> roles = user.getRole();

        for (Role role : roles) {
            role.getUsers().remove(user);  // Remove the user from each Role's set of users
            roleDao.save(role);  // Save the updated Role
        }

        userDao.deleteByUsername(userName);// Now we can delete the User
    }
    public boolean ExitsByUsername(String username){
        return userDao.existsByUserName(username);
    }




    public void assignProjectToUser(String userName, Long projectId) {
        User user = userDao.findById(userName)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));

        user.getProjects().add(project);
        project.setUser(user);

        userDao.save(user);
        projectRepository.save(project);
    }
}



