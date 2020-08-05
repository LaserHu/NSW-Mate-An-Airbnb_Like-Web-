package comp9900.backend.User;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;

import comp9900.backend.Auth.JWTUtil;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
@CrossOrigin(origins = "*")
public class UserController {
    private UserRepository userRepository;
    @Autowired
    private JWTUtil jwtUtil;
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/user/{id}")
    public ResponseEntity findUser(@PathVariable Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            return ResponseEntity.ok().body(null);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity createNewUser(@RequestBody User user) throws URISyntaxException {
        User newUser = new User(user.getUsername(), user.getEmail(), user.getPassword());
        User userInRepo = userRepository.findByEmail(newUser.getEmail());
        if (userInRepo == null) {
            newUser = userRepository.save(newUser);
            RegisterBody registerBody = new RegisterBody(
                    newUser.getUsername(),
                    newUser.getEmail(),
                    jwtUtil.generateToken(newUser),
                    newUser.getAvatar()
            );
            Resource<RegisterBody> resource =
                    new Resource<RegisterBody>(registerBody,
                            linkTo(methodOn(UserController.class).findUser(newUser.getId())).withSelfRel()
                    );
            return ResponseEntity.created(new URI(resource.getId().getHref())).body(resource);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        }
    }

    @PutMapping("/reset")
    public ResponseEntity resetPassword(@RequestBody ResetBody resetBody) {
        User savedUser = userRepository.findByEmail(resetBody.getEmail());
        if (savedUser != null) {
            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            if (passwordEncoder.matches(resetBody.getOriginalPassword(), savedUser.getPassword())) {
                savedUser.setPassword(passwordEncoder.encode(resetBody.getNewPassword()));
                userRepository.save(savedUser);
                String jwt = jwtUtil.generateToken(savedUser);
                return ResponseEntity.ok(
                        new RegisterBody(savedUser.getUsername(), savedUser.getEmail(), jwt, savedUser.getAvatar()));
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

class RegisterBody {
    public String username;
    public String email;
    public String jwt;
    public String avatar;
    RegisterBody() {}
    public RegisterBody(String username, String email, String jwt, String avatar) {
        this.email = email;
        this.jwt = jwt;
        this.username = username;
        this.avatar = avatar;
    }
}

@Data
class ResetBody {
   public String originalPassword;
   public String newPassword;
   public String email;
   ResetBody() {}
   public ResetBody(String originalPassword, String newPassword, String email) {
       this.originalPassword = originalPassword;
       this.newPassword = newPassword;
       this.email = email;
   }
}