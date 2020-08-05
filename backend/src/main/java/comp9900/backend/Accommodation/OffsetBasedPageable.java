package comp9900.backend.Accommodation;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Optional;

public class OffsetBasedPageable implements Pageable {
    private int limit;
    private int offset;
    private Sort sort = new Sort(Sort.Direction.DESC, "id");

    public OffsetBasedPageable(int limit, int offset) {
        if (limit < 1) {
            throw new IllegalArgumentException("limit must be larger than 1");
        }
        if (offset < 0) {
            throw new IllegalArgumentException();
        }
        this.limit = limit;
        this.offset = offset;
    }
    @Override
    public int getPageNumber() {
        return offset/limit;
    }

    @Override
    public int getPageSize() {
        return limit;
    }

    @Override
    public long getOffset() {
        return offset;
    }

    @Override
    public Sort getSort() {
        return sort;
    }

    @Override
    public Pageable next() {
        return new OffsetBasedPageable(getPageSize(), (int) (getPageSize()+getOffset()));
    }

    @Override
    public Pageable previousOrFirst() {
        if (hasPrevious()) {
            return new OffsetBasedPageable(getPageSize(), (int) (getOffset()-getPageSize()));
        } else {
            return first();
        }
    }

    @Override
    public Pageable first() {
        return new OffsetBasedPageable(getPageSize(), 0);
    }

    @Override
    public boolean hasPrevious() {
        return offset > 0;
    }

    @Override
    public boolean isPaged() {
        return true;
    }

    @Override
    public boolean isUnpaged() {
        return false;
    }

    @Override
    public Sort getSortOr(Sort sort) {
        return null;
    }

    @Override
    public Optional<Pageable> toOptional() {
        return Optional.empty();
    }
}
