package comp9900.backend.review;

import comp9900.backend.Accommodation.Accommodation;
import comp9900.backend.User.User;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@Entity
public class Review {
    private @Id @GeneratedValue Long id;
    private String content;
    private LocalDate time;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="room_id", nullable=false)
    private Accommodation accommodation;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    Review() {}
    Review(String content, LocalDate time, Accommodation accommodation, User user) {
        this.content = content;
        this.time = time;
        this.accommodation = accommodation;
        this.user = user;
    }
    Review(String content, Accommodation accommodation, User user) {
        this.content = content;
        this.accommodation = accommodation;
        this.user = user;
        this.time = LocalDate.now();
    }
}
