package comp9900.backend.Accommodation;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccommodationRepository extends JpaRepository<Accommodation, Long> {
    List<Accommodation> findByLocation(String location);
    List<Accommodation> findAccommodationsByLocationOrderById(String location, Pageable pageable);
    List<Accommodation> findAccommodationsByLocationAndPriceBetweenAndGuestGreaterThanEqualOrderByPriceAsc(
            String location, float start, float end, int guest);
}
