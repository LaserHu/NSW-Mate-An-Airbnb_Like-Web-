package comp9900.backend.history;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoryRepository  extends JpaRepository<History, Long> {

}
