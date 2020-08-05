package comp9900.backend.User;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
@Slf4j
public class LoadTestUser {
    @Bean
    CommandLineRunner loadLocalDB(UserRepository userRepository) {
        return args -> {
            for(int i = 0; i < 10; i++) {
                Long id = Long.valueOf(i);
                String email = "mike"+id+"@fake.com";
                String username = "mike"+id;
                String password = "mike"+id;
                User savedUser = userRepository.findById((id)).orElseGet(()->userRepository.findByEmail(email));
                if (savedUser == null) {
                    User newUser = new User(username, email, password);
                    userRepository.save(newUser);
                }
            }
        };
    }
}
