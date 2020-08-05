//package comp9900.backend.email;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Configurable;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.stereotype.Component;
//
//@Component
//public class EmailSender {
//    @Autowired
//    private JavaMailSender javaMailSender;
//    void sendEmail(String content, String to) {
//        System.out.println("Email sending");
//        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
//        simpleMailMessage.setTo(to);
//        simpleMailMessage.setSubject("Reset your email");
//        simpleMailMessage.setText(content);
//        simpleMailMessage.setFrom("liky1995@hotmail.com");
//        javaMailSender.send(simpleMailMessage);
//        System.out.println("Email sent");
//    }
//}
