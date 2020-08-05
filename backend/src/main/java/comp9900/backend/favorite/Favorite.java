package comp9900.backend.favorite;

import comp9900.backend.Accommodation.Accommodation;
import comp9900.backend.User.User;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Favorite {
    private @Id @GeneratedValue Long id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "room_id", nullable = false)
    private Accommodation accommodation;
    public Favorite() {}
    public Favorite(User user, Accommodation accommodation) {
        this.user = user;
        this.accommodation = accommodation;
    }
}
