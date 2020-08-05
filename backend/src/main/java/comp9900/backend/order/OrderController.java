package comp9900.backend.order;

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
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
public class OrderController {
    public OrderRepository orderRepository;
    public AccommodationRepository accommodationRepository;
    public UserRepository userRepository;
    public OrderController(OrderRepository orderRepository,
                           AccommodationRepository accommodationRepository,
                           UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.accommodationRepository = accommodationRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/order/{id}")
    public ResponseEntity getOrder(@PathVariable Long id) {
        HouseOrder order = orderRepository.findById(id).orElseThrow(()->new OrderNotFoundException(id));
        Resource<HouseOrder> houseOrderResource = new Resource<>(
                order,
                linkTo(methodOn(OrderController.class).getOrder(id)).withSelfRel()
        );
        return ResponseEntity.ok(houseOrderResource);
    }

    @PostMapping("/order")
    public ResponseEntity createOrder(@RequestBody OrderInformation orderInfo) throws URISyntaxException {
        Accommodation accommodation = accommodationRepository.findById(orderInfo.getRoomId())
                .orElseThrow(()-> new RoomNotFoundException(orderInfo.getRoomId()));
        User user = userRepository.findByEmail(orderInfo.getEmail());
        HouseOrder order = new HouseOrder(
                accommodation,
                LocalDate.parse(orderInfo.checkin),
                LocalDate.parse(orderInfo.checkout),
                user
        );
        if (checkAvailability(order)) {
            HouseOrder savedOrder = orderRepository.save(order);
            Resource<OrderInformation> houseOrderResource = new Resource<>(
                    orderInfo,
                    linkTo(methodOn(OrderController.class).getOrder(savedOrder.getId())).withSelfRel()
            );
            return ResponseEntity.created(new URI(houseOrderResource.getId().getHref())).body(houseOrderResource);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        }
    }

    @GetMapping("/order/u/{email}")
    public ResponseEntity findUserOrder(@PathVariable String email) {
        User user = userRepository.findByEmail(email);
        List<HouseOrder> houseOrders = orderRepository.findByUserId(user.getId());
        List<HouseOrderData> houseOrderData = houseOrders.stream()
                .map(HouseOrderData::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(houseOrderData);
    }

    @GetMapping("/available/{id}")
    public ResponseEntity findAvailableDate(@PathVariable Long id) {
        List<HouseOrder> houseOrders = orderRepository.findByAccommodationId(id);
        List<List<LocalDate>> dateList = new ArrayList<>();
        for(HouseOrder order: houseOrders) {
            List<LocalDate> datePair = new ArrayList<>();
            datePair.add(order.getCheckinDate());
            datePair.add(order.getCheckoutDate());
            dateList.add(datePair);
        }
        return ResponseEntity.ok(dateList);
    }
    // only check the house order within this month
    public boolean checkAvailability(HouseOrder houseOrder) {
        LocalDate start = LocalDate.of(houseOrder.getCheckinDate().getYear(), houseOrder.getCheckinDate().getMonth(), 1);
        LocalDate end = LocalDate.of(houseOrder.getCheckoutDate().getYear(),
                houseOrder.getCheckoutDate().getMonth(),
                YearMonth.of(
                        houseOrder.getCheckoutDate().getYear(), houseOrder.getCheckoutDate().getMonth()).lengthOfMonth());
        List<HouseOrder> houseOrders = orderRepository.findByCheckinDateBetweenAndCheckoutDateBetweenAndAccommodation_Id(
                start, end, start, end, houseOrder.getAccommodation().getId());
        if (houseOrder.getCheckoutDate().isBefore(houseOrder.getCheckinDate())) {
            return false;
        }
        for(HouseOrder order: houseOrders) {
            if (order.getCheckinDate().isEqual(houseOrder.getCheckinDate())
                    || order.getCheckoutDate().isEqual(houseOrder.getCheckoutDate())) {
                return false;
            } else if (order.getCheckinDate().isAfter(houseOrder.getCheckoutDate())
                    || order.getCheckoutDate().isBefore(houseOrder.getCheckinDate())) {

            } else {
                return false;
            }
        }
        return true;
    }
}

@Data
class OrderInformation {
    public Long roomId;
    public String checkin;
    public String checkout;
    public String email;

    OrderInformation() {}
    OrderInformation(Long roomId, String checkin, String checkout, String email) {
        this.roomId = roomId;
        this.checkin = checkin;
        this.checkout = checkout;
        this.email = email;
    }
}

class DatePair {
    public List<LocalDate> dates;
    public DatePair(LocalDate checkin, LocalDate checkout) {
        this.dates = new ArrayList<>();
        this.dates.add(checkin);
        this.dates.add(checkout);
    }
}

@Data
class HouseOrderData {
    public LocalDate checkin;
    public LocalDate checkout;
    public Accommodation accommodation;
    public String email;
    public HouseOrderData() {}
    public HouseOrderData(HouseOrder houseOrder) {
        this.checkin = houseOrder.getCheckinDate();
        this.checkout = houseOrder.getCheckoutDate();
        this.accommodation = houseOrder.getAccommodation();
        this.email = houseOrder.getUser().getEmail();
    }
}