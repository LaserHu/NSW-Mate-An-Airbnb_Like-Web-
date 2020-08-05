package comp9900.backend.Accommodation;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class RoomNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(RoomNotFoundException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public ResponseEntity<?> roomNotFoundHandler(RoomNotFoundException ex) {
        return new ResponseEntity("room not found", HttpStatus.NOT_FOUND);
    }
}
