package comp9900.backend.Host;

import comp9900.backend.Accommodation.Accommodation;
import comp9900.backend.User.User;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
public class Host implements Serializable {
    private @Id @GeneratedValue Long id;
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "room_id", nullable = false)
    private Accommodation accommodation;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User homeOwner;
    public Host() {}
    public Host(Accommodation accommodation, User homeOwner) {
        this.accommodation = accommodation;
        this.homeOwner = homeOwner;
    }
}
