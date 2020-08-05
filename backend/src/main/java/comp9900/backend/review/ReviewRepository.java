package comp9900.backend.review;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
//    Page<Review> findByAccommodationId(Long roomId, Pageable pageable);
    List<Review> findByAccommodationId(Long roomId);
}
