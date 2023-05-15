import { IMG_CDN_URL } from "../constants";
import useLocalStorage from "../utils/useLocalStorage";
import { AiFillStar } from "react-icons/ai";
import { useState } from "react";


//Restaurant card component: Image, name, cuisines
const RestaurantCard = ({name, cuisines, cloudinaryImageId, avgRating, slaString, costForTwoString,id, setRestaurants }) => {
    
    // const {  } = props;
    const buttonStyle = {
        backgroundColor: avgRating == "--" ? "#fff" : parseFloat(avgRating) < 4.0 ? "#db7c38" : "#48c479",
        color: isNaN(avgRating) ? "#535665" : "#fff"
    }

    const [isFavourite, setIsFavourite] = useState(false);

    const markFavourite = (event) => {
      setRestaurants({name, cuisines, cloudinaryImageId, avgRating, slaString, costForTwoString,id});
      event.preventDefault();
        setIsFavourite(!isFavourite);
       
        //console.log(props)
    }

    return (
        <div className="card">
        <div className="card-img-container">
          <div className="heart-button">
            <span className={isFavourite? "mark-fav-icon" : ""} 
            onClick={(e) => {markFavourite(e)}} >&#x2764;</span>
          </div>
          <img className="card-img" src={ IMG_CDN_URL  + cloudinaryImageId } alt={name}/>      
        </div>
        <div className="card-body">
          <h6 className="card-title">{name}</h6>
          <p className="card-tags">{cuisines.join(", ")}</p>
          <div className="card-details">
            <div className="rating" style={buttonStyle}>
              <AiFillStar /><span>{avgRating}</span>
            </div>
            <div>•</div>
            <div>{slaString}</div>
            <div>•</div>
            <div>{costForTwoString}</div>
          </div>
        </div>
      </div>
    )
}
// const RestaurantCard1 = ({
//     cloudinaryImageId,
//     name,
//     cuisines,
//     area,
//     lastMileTravelString,
//     costForTwoString,
//     avgRating,
// }) => {
//     return (
//         <div className="card">
//             <img src={IMG_CDN_URL + cloudinaryImageId} />
//             <h3>{name}</h3>
//             <h5>{cuisines.join(", ")}</h5>
//             <h5>{area}</h5>
//             <span>
//                 <h4 style={
//                     avgRating < 4
//                         ? { backgroundColor: "var(--light-red)" }
//                         : avgRating === "--"
//                             ? { backgroundColor: "white", color: "black" }
//                             : { color: "white" }
//                 } >
//                     <i class="ri-star-fill"></i>{avgRating}
//                 </h4>
//                 <h4>.</h4>
//                 <h4>{lastMileTravelString}</h4>
//                 <h4>.</h4>
//                 <h4>{costForTwoString}</h4>
//             </span>
//         </div>
//     );
// }

export default RestaurantCard;