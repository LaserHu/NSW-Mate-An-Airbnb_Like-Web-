package comp9900.backend.HelloWorld;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestJwtController {
    @GetMapping("/HelloJWT")
    public ResponseEntity HelloJWT() {
        return ResponseEntity.ok("Hello JWT");
    }
}
