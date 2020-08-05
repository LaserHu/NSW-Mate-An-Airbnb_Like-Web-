import React from "react";
import { Rate } from "antd";

// TODO: info is bad naming.
const PlaceCard = ({ info }) => {
  const {
    address,
    distanceText,
    name,
    openNow,
    photoUrl,
    priceLevel,
    rating,
    timeText,
    user_ratings_total
  } = info;
  /*console.log(photoUrl);*/
  return (
    <div className="w-100 mx-4 my-4">
      {photoUrl === "" && (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
        <img
          src={require("../../assets/images/genericrestaurant.jpeg")}
          className="image-wrapper-sm mb-2"
          alt="restaurant"
          style={{
            objectFit: "cover",
            borderRadius: "5px",
            height: "15rem",
            width: "100%"
          }}
        />
      )}
      {photoUrl !== "" && (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
        <img
          src={photoUrl}
          className="image-wrapper-sm mb-2"
          alt="restaurant"
          style={{
            objectFit: "cover",
            borderRadius: "5px",
            height: "15rem",
            width: "100%"
          }}
        />
      )}

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <span className="d-block mb-1">{address}</span>
          <span className="d-block">{distanceText}</span>
          <span className="d-block">{timeText}</span>
        </div>
        <ul className="list-group list-group-flush">
          {openNow ? (
            <li className="list-group-item">Open</li>
          ) : (
            <li className="list-group-item">Closed</li>
          )}
          <li className="list-group-item">
            Rating - <Rate value={rating} /> ({user_ratings_total} ratings)
          </li>
          <li className="list-group-item">
            Price - <Rate value={priceLevel} character="$" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PlaceCard;
