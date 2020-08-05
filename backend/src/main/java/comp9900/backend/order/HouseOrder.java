package comp9900.backend.order;

import comp9900.backend.Accommodation.Accommodation;
import comp9900.backend.User.User;
import lombok.Data;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@Data
public class HouseOrder {
    private @GeneratedValue @Id Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "room_id", nullable = false)
    private Accommodation accommodation;
    private LocalDate checkinDate ;
    private LocalDate checkoutDate ;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public HouseOrder() {}

    public HouseOrder(Accommodation accommodation, LocalDate checkin, LocalDate checkout, User user) {
        this.checkinDate = checkin;
        this.checkoutDate = checkout;
        this.accommodation = accommodation;
        this.user = user;
    }
}
