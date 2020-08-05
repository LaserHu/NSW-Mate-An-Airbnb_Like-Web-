package comp9900.backend.Host;

import comp9900.backend.Accommodation.Accommodation;
import comp9900.backend.User.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HostRepository extends JpaRepository<Host, Long> {
    Optional<Host> findHostByAccommodation(Accommodation accommodation);
    List<Host> findByHomeOwner_Id(Long id);
}
