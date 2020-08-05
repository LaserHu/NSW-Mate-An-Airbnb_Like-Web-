package comp9900.backend.Accommodation;


import comp9900.backend.User.User;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Data
@Entity
public class Accommodation {

    private @Id @GeneratedValue Long id;    // Hotel_ID
    private String name;    // full name of a hotel
    private Float price;   // price with unit
    private Integer reviewNums; // the number of reviews
    @Length(max = 13000)
    private String introduction;    // introduction of hotel
    private String location;    // location
    private String amenities;   // wifi, hot water, etc
    private String interior;    // how many bedroom, room space, etc
    // store the url of images
    private String mainImage;
    @Length(max = 1000)
    private String viceImages;
    @Min(0)
    @Max(5)
    private Float rating;
    private Integer guest;


    public Accommodation(){}
    public Accommodation(Float price, String introduction, String location, String name,
                  Integer reviewNums, String amenities, String interior,
                  String mainImage, String viceImages, Integer guest) {
        this.price = price;
        this.introduction = introduction;
        this.location = location;
        this.rating = 0f;
        this.name = name;
        this.reviewNums = reviewNums;
        this.amenities = amenities;
        this.interior = interior;
        this.mainImage = mainImage;
        this.viceImages = viceImages;
        this.guest = guest;
    }

    public Accommodation(Float price, String introduction, String location, String name,
                         Integer reviewNums, String amenities, String interior,
                         String image, Integer guest) {
        this.name = name;
        this.price = price;
        this.introduction = introduction;
        this.location = location;
        this.rating = 0f;
        this.name = name;
        this.reviewNums = reviewNums;
        this.amenities = amenities;
        this.interior = interior;
        this.guest = guest;
        this.mainImage = image;
        this.viceImages = null;
    }
}
