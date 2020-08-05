package comp9900.backend.order;

public class OrderNotFoundException extends RuntimeException {
    public OrderNotFoundException(Long id) {
        super("Accommodation resource not found "+id);
    }
    OrderNotFoundException() {
        super("Accommodation resource not found");
    }
}
