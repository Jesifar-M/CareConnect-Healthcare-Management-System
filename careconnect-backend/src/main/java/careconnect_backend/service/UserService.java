package careconnect_backend.service;

import careconnect_backend.entity.User;
import careconnect_backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Register new user
    public User registerUser(User user) {

        // Check whether email is already registered
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // All newly registered users are normal users
        user.setRole("USER");

        // Encrypt password before saving
        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        return userRepository.save(user);
    }

    // Get all registered users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Login user
    public User loginUser(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // Check password
        if (!passwordEncoder.matches(
                password,
                user.getPassword())) {

            throw new RuntimeException("Invalid password");
        }

        return user;
    }

    // Update user password
    public void updatePassword(
            String email,
            String oldPassword,
            String newPassword) {

        // Find user using email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // Verify current password
        if (!passwordEncoder.matches(
                oldPassword,
                user.getPassword())) {

            throw new RuntimeException("Current password is incorrect");
        }

        // Encrypt the new password before saving
        user.setPassword(
                passwordEncoder.encode(newPassword)
        );

        // Save the updated password
        userRepository.save(user);
    }
}