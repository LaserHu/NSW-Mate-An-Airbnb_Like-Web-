package comp9900.backend.history;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HistoryController {
    HistoryRepository historyRepository;
    public HistoryController(HistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
    }
    @GetMapping("/records/all")
    public ResponseEntity getAllRecords() {
        List<History>  histories = historyRepository.findAll();
        return ResponseEntity.ok(histories);
    }
}
