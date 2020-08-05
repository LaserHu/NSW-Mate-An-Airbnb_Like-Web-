package comp9900.backend.history;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

@Component
@Aspect
public class HistoryRecorder {
    private HistoryRepository historyRepository;
    public HistoryRecorder(HistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
    }
    @After("execution(* comp9900.backend.Accommodation.AccommodationController.getOneRoom(..)))")
    public void test(JoinPoint joinPoint){
        Object[] args = joinPoint.getArgs();
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
                .currentRequestAttributes())
                .getRequest();
        String ipAddr = request.getHeader("X-FORWARDED-FOR");
        if (ipAddr == null) {
            ipAddr = request.getRemoteAddr();
        } else if (ipAddr.contains(",")) {
            ipAddr = ipAddr.split(",")[0];
        } else {
            // nothing need to do
        }
        History history = new History(ipAddr, (Long)args[0]);
        historyRepository.save(history);
    }
}
