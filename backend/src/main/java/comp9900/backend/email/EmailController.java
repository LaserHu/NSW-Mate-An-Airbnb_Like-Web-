//package comp9900.backend.email;
//
//import comp9900.backend.Accommodation.RoomNotFoundException;
//import comp9900.backend.User.User;
//import comp9900.backend.User.UserRepository;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//public class EmailController {
//    private EmailSender emailSender;
//    private UserRepository repository;
//    private String startURL = "https://dwo0tbj14j3pa.cloudfront.net";
//    @GetMapping("/email/{userId}")
//    public void resetPasswordByEmail(@PathVariable Long userId) {
//        User user = repository.findById(userId).orElseThrow(()->new RoomNotFoundException(userId));
////        emailSender.sendEmail(startURL+"/email"+userId);
//    }
//}
