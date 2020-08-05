package comp9900.backend.User;

import lombok.Data;
import org.hibernate.validator.constraints.UniqueElements;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;

@Data
@Entity
@Table(name = "Person")
public class User {
    private @GeneratedValue @Id Long id;
    private String username;
    @Column(unique = true, name = "email")
    private String email;
    private String password;
    private String avatar;
    private final String defaultAvatar = "https://comp9900-3900-bucket.s3-ap-southeast-2.amazonaws.com/download.jpeg";
    public User() {}
    public User(String username, String email, String password, String avatar) {
        this.username = username;
        this.email = email;
        this.password = encodePassword(password);
        this.avatar = avatar;
    }
    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = encodePassword(password);
        this.avatar = defaultAvatar;
    }
    private String encodePassword(String password) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.encode(password);
    }
}
