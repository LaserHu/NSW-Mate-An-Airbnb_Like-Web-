package comp9900.backend.favorite;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUserId(Long id);
    List<Favorite> findByAccommodationId(Long id);
}
