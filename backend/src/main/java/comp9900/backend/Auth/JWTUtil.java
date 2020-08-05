package comp9900.backend.Auth;

import comp9900.backend.User.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JWTUtil implements Serializable {
    private String secreteKey;
    private long Jwt_Valid_Time;

    public JWTUtil(JWTConfig jwtConfig) {
        this.secreteKey = Base64.getEncoder().encodeToString("Hello".getBytes());
        this.Jwt_Valid_Time = jwtConfig.getExpiration();
    }

    public <R> R getClaimFromToken(String token, Function<Claims, R> claimsResolver) {
        Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    public Claims getClaimFromToken(String token) {
        Claims claims = getAllClaimsFromToken(token);
        return claims;
    }

    public Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(secreteKey).parseClaimsJws(token).getBody();
    }

    public String getEmailFromToken(String token) {
         Claims claims = getClaimFromToken(token);
         String email = (String) claims.get("email");
         return email;
    }

    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public Date getExpirationDateFromToken(String token) {
        Claims claims = getAllClaimsFromToken(token);
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public String generateToken(User user) {
        String username = user.getUsername();
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", user.getEmail());
        return doGenerateToken(claims, username);
    }
    public String doGenerateToken(Map<String, Object> claims, String username) {
        return Jwts.builder().setClaims(claims).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+Jwt_Valid_Time*1000))
                .setSubject(username)
                .signWith(SignatureAlgorithm.HS256, secreteKey).compact();
    }
    public boolean isExpired(String token) {
        final Date expirationDate = getExpirationDateFromToken(token);
        return expirationDate.before(new Date());
    }
    public boolean validateToken(String token, User user) {
        return getUsernameFromToken(token).equals(user.getUsername()) && !isExpired(token);
    }
}
