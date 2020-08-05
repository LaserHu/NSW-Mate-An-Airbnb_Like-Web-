package comp9900.backend.order;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface OrderRepository extends JpaRepository<HouseOrder, Long> {
    List<HouseOrder> findByCheckinDateBetweenAndCheckoutDateBetweenAndAccommodation_Id(LocalDate start, LocalDate end, LocalDate start1, LocalDate end1, Long id);
    List<HouseOrder> findByAccommodationId(Long id);
    List<HouseOrder> findByUserId(Long id);
}
