package comp9900.backend.Auth;

import comp9900.backend.User.User;
import comp9900.backend.User.UserRepository;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
@Component
public class JWTRequestFilter extends OncePerRequestFilter {
    private final JWTConfig jwtConfig;
    private JWTUtil jwtUtil;
    private UserService userService;
    @Autowired
    public JWTRequestFilter(JWTConfig jwtConfig, JWTUtil jwtUtil, UserService service) {
        this.jwtConfig = jwtConfig;
        this.jwtUtil = jwtUtil;
        this.userService = service;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest,
                                    HttpServletResponse httpServletResponse,
                                    FilterChain filterChain) throws ServletException, IOException {
        // get header
        String header = httpServletRequest.getHeader("Authorization");
        // if header is no auth, filter out
        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(httpServletRequest, httpServletResponse);
            return;
        }
        String jwtToken = header.substring(7);
        System.out.println(jwtToken);
        // get username from token
//        String username = null;
//        username = jwtUtil.getUsernameFromToken(jwtToken);
        String email = null;
        email = jwtUtil.getEmailFromToken(jwtToken);
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//            User user = userService.getUserByEmail(username);
            User user = userService.getUserByEmail(email);
            if (user != null && jwtUtil.validateToken(jwtToken, user)) {
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken;
                usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        user,null,null
                );
                usernamePasswordAuthenticationToken.
                        setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}
