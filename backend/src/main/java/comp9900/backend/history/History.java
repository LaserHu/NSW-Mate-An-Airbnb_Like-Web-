package comp9900.backend.history;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
public class History {
    private @Id @GeneratedValue Long id;
    private String userIp;
    private Long roomId;

    public History() {
    }
    public History(String userIp, Long roomId) {
        this.userIp = userIp;
        this.roomId = roomId;
    }
}
