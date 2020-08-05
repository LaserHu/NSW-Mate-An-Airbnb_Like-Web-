package comp9900.backend.Host;

import comp9900.backend.Accommodation.Accommodation;
import comp9900.backend.Accommodation.AccommodationRepository;
import comp9900.backend.User.User;
import comp9900.backend.User.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@Slf4j
public class LoadLocalHostDB {
    @Bean
    CommandLineRunner loadHostData(UserRepository userRepository, HostRepository hostRepository, AccommodationRepository accommodationRepository) {
        return args -> {
            List<Accommodation> accommodations = accommodationRepository.findAll();
            if (accommodations != null && !accommodations.isEmpty()) {
                for(Accommodation accommodation: accommodations) {
                    Host host = hostRepository.findHostByAccommodation(accommodation).orElseGet(()->null);
                    if (host != null) {
                        // no action
                    } else {
                        // make up a host
                        List<User> users = userRepository.findAll();
                        if (!users.isEmpty()) {
                            User luckyDog = users.get(0);
                            Host fakeHost = new Host(accommodation, luckyDog);
                            hostRepository.save(fakeHost);
                        }
                    }
                }
            }
        };
    }
}
