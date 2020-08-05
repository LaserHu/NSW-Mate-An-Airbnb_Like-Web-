package comp9900.backend.Auth;

import comp9900.backend.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class JWTAuthController {

//    @Autowired
//    private AuthenticationManager authenticationManager;
    @Autowired
    private JWTUtil jwtUtil;
    @Autowired
    private UserService userService;
    @PostMapping("/auth")
    public ResponseEntity getAuth(@RequestBody LoginBody user) throws Exception {
//        authenticate(user.getUsername(), user.getPassword());
        // check password before generate token
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        User savedUser = userService.getUserByEmail(user.getEmail());
        if (savedUser != null && encoder.matches(user.getPassword(), savedUser.getPassword())) {
            String token = jwtUtil.generateToken(savedUser);
            RegisterBody registerBody = new RegisterBody(savedUser.getUsername(), savedUser.getEmail(), token, savedUser.getAvatar());
            return ResponseEntity.ok(registerBody);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
//    private void authenticate(String username, String password) throws Exception {
//        try {
//            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
//        } catch (DisabledException e) {
//            throw new Exception("USER_DISABLED", e);
//        } catch (BadCredentialsException e) {
//            throw new Exception("INVALID_CREDENTIALS", e);
//        }
//    }
}

class LoginBody {
    public String email;
    public String password;
    LoginBody() {}
    public LoginBody(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
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