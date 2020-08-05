package comp9900.backend.review;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceAssembler;
import org.springframework.stereotype.Component;

@Component
public class ReviewResourceAssembler implements ResourceAssembler<ReviewResource, Resource<ReviewResource>> {
    @Override
    public Resource<ReviewResource> toResource(ReviewResource reviewResource) {
        return new Resource<>(
                reviewResource,
                linkTo(methodOn(ReviewController.class).getOneReview(reviewResource.getId())).withSelfRel()
        );
    }
}
