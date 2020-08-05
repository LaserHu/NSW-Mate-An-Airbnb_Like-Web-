package comp9900.backend.Accommodation;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;

import comp9900.backend.Host.Host;
import comp9900.backend.Host.HostRepository;
import comp9900.backend.User.User;
import lombok.Data;
import org.springframework.hateoas.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.io.Serializable;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class AccommodationController {
    private AccommodationRepository accommodationRepository;
    private AccommodationResourceAssembler assembler;
    private HostRepository hostRepository;

    @RequestMapping(value = "/room/**", method = RequestMethod.OPTIONS)
    public ResponseEntity responseToOptions() {
        return ResponseEntity.ok().build();
    }
    AccommodationController(AccommodationRepository accommodationRepository, AccommodationResourceAssembler assembler, HostRepository hostRepository) {
        this.accommodationRepository = accommodationRepository;
        this.assembler = assembler;
        this.hostRepository = hostRepository;
    }
    @GetMapping("/rooms/all")
    public ResponseEntity queryRooms(@RequestParam String location) {
        System.out.println(location);
        return ResponseEntity.ok(location);
    }

    @PostMapping("/room")
    public ResponseEntity createRoom(@RequestBody Accommodation accommodation) {
        return ResponseEntity.ok().build();
    }

    @GetMapping("/room/{id}")
    public ResponseEntity getOneRoom(@PathVariable Long id) {
        Accommodation accommodation =
                accommodationRepository.findById(id).orElseThrow(()->new RoomNotFoundException(id));
        User owner = getOwner(accommodation);
        OwnerInfo ownerInfo = new OwnerInfo(owner.getUsername(), owner.getEmail(), owner.getAvatar());
        AccommodationFullInfo accommodationFullInfo = new AccommodationFullInfo(accommodation, ownerInfo);
        Resource<AccommodationFullInfo> resource = assembler.toResource(accommodationFullInfo);
        return ResponseEntity.ok().body(resource);
    }

//    @GetMapping("/room/search/{location}")
//    public ResponseEntity<?> getBySearch(@PathVariable String location) {
//        List<Resource<Accommodation>> accommodations =
//                accommodationRepository
//                        .findByLocation(location).stream()
//                        .map(assembler::toResource)
//                        .collect(Collectors.toList());
//        if (accommodations.size() <= 0) {
//            throw new RoomNotFoundException();
//        }
//        Resources<Resource<Accommodation>> resources =
//                new Resources<>(
//                        accommodations
//                );
//        return ResponseEntity.ok().body(resources);
//    }
//
//    @PostMapping("/room/page")
//    public ResponseEntity getByPage(@RequestBody PageConfig page) {
//        List<Accommodation> accommodations =
//                accommodationRepository.findAccommodationsByLocationOrderById(page.location,
//                        PageRequest.of(page.offset, page.limit));
//        List<Resource<Accommodation>> accommodationsList = accommodations
//                .stream()
//                .map(assembler::toResource)
//                .collect(Collectors.toList());
//        if (accommodationsList.size() <= 0) {
//            throw new RoomNotFoundException();
//        }
//        Resources<Resource<Accommodation>> resources = new Resources<>(accommodationsList);
//        return ResponseEntity.ok(resources);
//    }

    @GetMapping("/room/search")
    public ResponseEntity searchRoom(@RequestParam(name = "location",required = false) String location,
                                     @RequestParam(name = "price", required = false) Float price,
                                     @RequestParam(name = "guest", required = false) Integer guest,
                                     @RequestParam(name = "rating", required = false) Float rating,
                                     @RequestParam(name = "price_limit",required = false) Float priceLimit
    ) {
        List<Accommodation> room = accommodationRepository.findAll();
        List<Accommodation> result = room.stream()
                .filter(item->item.getLocation().toLowerCase().equals(location.toLowerCase()))
                .filter(item->item.getPrice() >= (price == null ? 0: price))
                .filter((item)->{
                    if (price == null)
                        return true;
                    else
                        return item.getPrice() <= priceLimit;
                })
                .filter(item->item.getRating() >= (rating == null? 0: rating))
                .filter(item->item.getGuest() >=(guest == null? 0: guest))
                .sorted((Comparator.comparing(Accommodation::getPrice)))
                .collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }

    @PostMapping("/room/{id}")
    public ResponseEntity<?> changeRoomInfo(@PathVariable Long id) {
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/room/{id}")
    public ResponseEntity createNewRoom(@PathVariable Long id) {
        return ResponseEntity.noContent().build();
    }

    public User getOwner(Accommodation accommodation) {
        Host host = hostRepository.findHostByAccommodation(accommodation).orElse(null);
        if (host != null) {
            return host.getHomeOwner();
        }
        return null;
    }
}

class PageConfig {
    public String location;
    public int offset;
    public int limit;
    PageConfig(String location, int offset, int limit) {
        this.limit = limit;
        this.offset = offset;
        this.location = location;
    }
}

@Data
class OwnerInfo implements Serializable {
    private String ownerName;
    private String ownerEmail;
    private String ownerAvatar;
    public OwnerInfo(String ownerName, String ownerEmail, String ownerAvatar) {
        this.ownerName = ownerName;
        this.ownerEmail = ownerEmail;
        this.ownerAvatar = ownerAvatar;
    }
}

@Data
class AccommodationFullInfo implements Serializable {

    private Accommodation accommodation;
    private OwnerInfo ownerInfo;


    public AccommodationFullInfo(){}
    public AccommodationFullInfo(Accommodation accommodation, OwnerInfo ownerInfo) {
        this.accommodation = accommodation;
        this.ownerInfo = ownerInfo;
    }
}
