package comp9900.backend.review;

import comp9900.backend.Accommodation.Accommodation;
import comp9900.backend.Accommodation.AccommodationRepository;
import comp9900.backend.User.User;
import comp9900.backend.User.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@Configuration
@Slf4j
public class LoadTestReview {
    @Bean
    CommandLineRunner loadLocalReviewDB(UserRepository userRepository,
                                  ReviewRepository reviewRepository,
                                  AccommodationRepository accommodationRepository) {
        return args -> {
            List<User> users = userRepository.findAll();
            List<Accommodation> accommodations = accommodationRepository.findAll();
            if (accommodations.isEmpty()) {
                Random random = new Random();
                for(Accommodation accommodation: accommodations) {
                    for(int i = 0; i < 10; i++) {
                        int idx = random.nextInt(users.size());
                        Review newReview = new Review("I love this room", LocalDate.now(), accommodation, users.get(idx));
                        reviewRepository.save(newReview);
                    }
                }
            }
        };
    }
}
