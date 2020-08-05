package comp9900.backend.review;

import lombok.Data;

@Data
public class ReviewResource {
    private Long id;
    private String content;
    private Long roomId;

    ReviewResource(Review review) {
        this.id = review.getId();
        this.content = review.getContent();
        this.roomId = review.getAccommodation().getId();
    }
}
