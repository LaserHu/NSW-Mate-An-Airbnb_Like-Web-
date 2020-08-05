package comp9900.backend.Accommodation;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceAssembler;
import org.springframework.stereotype.Component;

@Component
public class AccommodationResourceAssembler implements ResourceAssembler<AccommodationFullInfo, Resource<AccommodationFullInfo>> {
    @Override
    public Resource<AccommodationFullInfo> toResource(AccommodationFullInfo accommodation) {
        return new Resource<>(
                accommodation,
                linkTo(methodOn(AccommodationController.class).getOneRoom(accommodation.getAccommodation().getId())).withSelfRel()
        );
    }
}
