package comp9900.backend.review;

import comp9900.backend.Accommodation.Accommodation;
import comp9900.backend.Accommodation.AccommodationRepository;
import comp9900.backend.Accommodation.RoomNotFoundException;
import comp9900.backend.User.User;
import comp9900.backend.User.UserRepository;
import lombok.Data;
import org.springframework.hateoas.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ReviewController {
    private ReviewRepository reviewRepository;
    private ReviewResourceAssembler assembler;
    private UserRepository userRepository;
    private AccommodationRepository accommodationRepository;
    ReviewController(ReviewRepository reviewRepository,
                     UserRepository userRepository,
                     AccommodationRepository accommodationRepository) {
        this.reviewRepository = reviewRepository;
        this.accommodationRepository = accommodationRepository;
        this.userRepository = userRepository;
    }

    // get particular review by id
    @GetMapping("/review/{roomId}")
    public ResponseEntity<?> getOneReview(@PathVariable Long roomId) {
        List<Review> reviewList = reviewRepository.findByAccommodationId(roomId);
        reviewList.sort((Comparator.comparing(Review::getTime)));
        Collections.reverse(reviewList);
        List<ReviewResponse> reviewResponses = new ArrayList<>();
        for(Review review: reviewList) {
            reviewResponses.add(new ReviewResponse(
                        review.getContent(),
                        review.getTime(),
                        review.getUser().getId(),
                        review.getUser().getUsername(),
                        review.getUser().getAvatar()));
        }
        return ResponseEntity.ok(reviewResponses);
    }

    @PostMapping("/review")
    public ResponseEntity createReview(@RequestBody ReviewInformation reviewInfo) throws URISyntaxException {
        User user = userRepository.findByEmail(reviewInfo.getEmail());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Accommodation accommodation = accommodationRepository.
                findById(reviewInfo.getRoomId()).
                orElseThrow(()->new RoomNotFoundException(reviewInfo.getRoomId()));
        Review review = new Review(
            reviewInfo.getContent(), accommodation, user
        );
        Review savedReview = reviewRepository.save(review);
        accommodation.setReviewNums(accommodation.getReviewNums()+1);
        accommodationRepository.save(accommodation);
        Resource reviewResource = new Resource(
                reviewInfo,
                linkTo(methodOn(ReviewController.class).getOneReview(review.getId())).withSelfRel()
        );
        return ResponseEntity.created(new URI(reviewResource.getId().getHref())).body(reviewResource);
    }
    @PutMapping("/review/{id}")
    public ResponseEntity changeReview(@PathVariable Long id, @RequestBody String newReview) {
        Review review = reviewRepository.findById(id).orElseThrow(()->new RoomNotFoundException(id));
        review.setContent(newReview);
        return ResponseEntity.ok().build();
    }
}

@Data
class ReviewInformation {
    private String email;
    private Long roomId;
    private String content;
    public ReviewInformation(String email, Long roomId, String content) {
        this.content = content;
        this.roomId = roomId;
        this.email = email;
    }
}

@Data
class ReviewResponse {
    private String content;
    private LocalDate time;
    private Long userId;
    private String username;
    private String avatar;
    public ReviewResponse(String content, LocalDate time, Long userId, String username, String avatar) {
        this.content = content;
        this.time = time;
        this.userId = userId;
        this.username = username;
        this.avatar = avatar;
    }
}