package comp9900.backend.Accommodation;

public class RoomNotFoundException extends RuntimeException {
    public RoomNotFoundException(Long id) {
        super("Accommodation resource not found "+id);
    }
    RoomNotFoundException() {
        super("Accommodation resource not found");
    }
}
