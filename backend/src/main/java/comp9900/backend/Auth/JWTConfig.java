package comp9900.backend.Auth;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Data
@Component
public class JWTConfig {
    @Value("${security.jwt.uri:/auth/**}")
    private String url;
    @Value("${security.jwt.secrete:cse}")
    private String secrete;
    @Value("${security.jwt.header:Authorization}")
    private String header;
    @Value("${security.jwt.prefix:Bearer }")
    private String prefix;
    @Value("${security.jwt.expiration:#{12*60*60}}")
    private int expiration;
}
