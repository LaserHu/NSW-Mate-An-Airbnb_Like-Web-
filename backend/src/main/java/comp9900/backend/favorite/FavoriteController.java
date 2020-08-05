package comp9900.backend.favorite;

import comp9900.backend.Accommodation.Accommodation;
import comp9900.backend.Accommodation.AccommodationRepository;
import comp9900.backend.Accommodation.RoomNotFoundException;
import comp9900.backend.User.User;
import comp9900.backend.User.UserRepository;
import lombok.Data;
import org.springframework.hateoas.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
public class FavoriteController {
    public UserRepository userRepository;
    public FavoriteRepository favoriteRepository;
    public AccommodationRepository accommodationRepository;

    @RequestMapping(value = "/like/all", method = RequestMethod.OPTIONS)
    public ResponseEntity responseToOptions() {
        return ResponseEntity.ok().build();
    }
    @RequestMapping(value = "/like/**", method = RequestMethod.OPTIONS)
    public ResponseEntity likeControllerResponseToOptions() {
        return ResponseEntity.ok().build();
    }
    public FavoriteController(UserRepository userRepository, FavoriteRepository favoriteRepository, AccommodationRepository accommodationRepository) {
        this.userRepository = userRepository;
        this.favoriteRepository = favoriteRepository;
        this.accommodationRepository = accommodationRepository;
    }

    @GetMapping("/like/all")
    public ResponseEntity getAll() {
        List<Favorite> favorites = favoriteRepository.findAll();
        return ResponseEntity.ok(favorites);
    }

    @GetMapping("/like/{email}")
    public ResponseEntity getFavoriteByUserEmail(@PathVariable String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            List<Favorite> favorites = favoriteRepository.findByUserId(user.getId());
            List<Accommodation> accommodations = favorites.stream()
                    .map(favorite -> favorite.getAccommodation()).collect(Collectors.toList());
            return ResponseEntity.ok(accommodations);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/like/check")
    public ResponseEntity checkFavorite(@RequestParam("email") String email, @RequestParam("roomId") Long roomId) {
        User user = userRepository.findByEmail(email);
        Accommodation accommodation = accommodationRepository.findById(roomId).orElseThrow(()->new RoomNotFoundException(roomId));
        List<Favorite> favorites = favoriteRepository.findByUserId(user.getId());
        for(Favorite favorite: favorites) {
            if (favorite.getAccommodation().getId() == roomId) {
                return ResponseEntity.ok("true");
            }
        }
        return ResponseEntity.ok("false");
    }

    @PostMapping("/dislike")
    public ResponseEntity deleteFavorite(@RequestBody FavoriteBody favoriteBody) {
        User user = userRepository.findByEmail(favoriteBody.getEmail());
        Accommodation accommodation = accommodationRepository
                .findById(favoriteBody.getRoomId())
                .orElseThrow(()->new RoomNotFoundException(favoriteBody.getRoomId()));
        if (user != null && accommodation != null) {
            List<Favorite> favorites = favoriteRepository.findByUserId(user.getId());
            for(Favorite favorite: favorites) {
                if (favorite.getAccommodation().getId() == favoriteBody.getRoomId()) {
                    favoriteRepository.delete(favorite);
                    return ResponseEntity.ok().build();
                }
            }
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/like")
    public ResponseEntity createFavorite(@RequestBody FavoriteBody favoriteBody) {
        User user = userRepository.findByEmail(favoriteBody.getEmail());
        Accommodation accommodation = accommodationRepository
                .findById(favoriteBody.getRoomId())
                .orElseThrow(()->new RoomNotFoundException(favoriteBody.getRoomId()));
        if (user != null && accommodation != null) {
            Favorite favorite = new Favorite(user, accommodation);
            favoriteRepository.save(favorite);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
@Data
class FavoriteBody {
    String email;
    Long roomId;

    public FavoriteBody(String email, Long roomId) {
        this.email = email;
        this.roomId = roomId;
    }
}