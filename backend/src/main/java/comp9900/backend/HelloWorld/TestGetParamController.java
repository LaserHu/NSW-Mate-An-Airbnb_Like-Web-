package comp9900.backend.HelloWorld;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestGetParamController {
    @GetMapping("/test1")
    public ResponseEntity testParam(@RequestParam(name = "id", defaultValue = "1") String id
            , @RequestParam(name = "name") String name) {
        System.out.println("id is "+id);
        System.out.println("name is "+ name);
        return ResponseEntity.ok(id+": "+name);
    }
}
