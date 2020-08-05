package comp9900.backend.Host;

import comp9900.backend.Accommodation.Accommodation;
import comp9900.backend.Accommodation.AccommodationRepository;
import comp9900.backend.User.User;
import comp9900.backend.User.UserRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
public class HostController {
    private UserRepository userRepository;
    private AccommodationRepository accommodationRepository;
    private HostRepository hostRepository;
    private String endpointURL = "https://comp9900-3900-bucket.s3-ap-southeast-2.amazonaws.com/";
    @Autowired
    private StorageService storageService;
    public HostController(UserRepository userRepository,
                          AccommodationRepository accommodationRepository,
                          HostRepository hostRepository) {
        this.accommodationRepository = accommodationRepository;
        this.userRepository = userRepository;
        this.hostRepository = hostRepository;
    }
    @GetMapping("/host/{email}")
    public ResponseEntity getAllHostByUser(@PathVariable String email) {
        User homeOwner = userRepository.findByEmail(email);
        if (homeOwner != null) {
            List<Host> hosts = hostRepository.findByHomeOwner_Id(homeOwner.getId());
            List<Accommodation> accommodations = hosts.stream()
                        .map(Host::getAccommodation).collect(Collectors.toList());
                return ResponseEntity.ok(accommodations);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping("/host")
    public ResponseEntity createNewHost(@RequestBody HostRequestBody requestBody) throws URISyntaxException {
        int originalReviewNumber = 0;
        // process images
        String mainImage = "";
        StringBuilder viceImage = new StringBuilder();
        List<String> imageList = requestBody.getImages();
        for(int i = 0; i < imageList.size(); i++) {
            String filename = requestBody.getName().replaceAll("\\s", "") + i + ".jpeg";
            String fileURL = storageFile(imageList.get(i), filename);
            if (i == 0) {
                mainImage = fileURL;
            } else {
                viceImage.append(fileURL).append(i >= imageList.size()?"":",");
            }
        }
        Accommodation accommodation = new Accommodation(
                requestBody.getPrice(),
                requestBody.getIntroduction(),
                requestBody.getLocation(),
                requestBody.getName(),
                originalReviewNumber,
                requestBody.getAmenities(),
                requestBody.getInterior(),
                mainImage,
                viceImage.toString(),
                requestBody.getGuest()
        );
        User user = userRepository.findByEmail(requestBody.getEmail());
        if (user == null) {
            // user not exist
            return ResponseEntity.notFound().build();
        } else {
            Accommodation savedRoom = accommodationRepository.save(accommodation);
            Host newHost = new Host(savedRoom, user);
            hostRepository.save(newHost);
            Resource<Accommodation> resource = new Resource<>(
                    accommodation,
                    linkTo(methodOn(HostController.class).getAllHostByUser(user.getEmail())).withRel("owner")
            );
            return ResponseEntity.ok()
                    .body(resource);
        }
    }
    private String storageFile(String base64String, String filename) {
        storageService.uploadFile(base64String, filename);
        return endpointURL+filename;
    }
}

@Data
class HostRequestBody {
    public String email;
    public String introduction;
    private String name;    // full name of a hotel
    private Float price;   // price with unit
    private String location;    // location
    private String amenities;   // wifi, hot water, etc
    private String interior;    // how many bedroom, room space, etc
    // store the url of images
    private List<String> images;
    private Integer guest;
    public HostRequestBody() {}

    public HostRequestBody(String email,
                           String introduction,
                           String name,
                           Float price,
                           String location,
                           String amenities,
                           String interior,
                           List<String> images,
                           Integer guest) {
        this.email = email;
        this.introduction = introduction;
        this.name = name;
        this.price = price;
        this.location = location;
        this.amenities = amenities;
        this.interior = interior;
        this.images = images;
        this.guest = guest;
    }
}

