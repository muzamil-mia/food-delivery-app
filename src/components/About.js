import food from "../images/burger-image.png";
import { Outlet } from "react-router-dom";
const About = () => {
    return (
        <div className="about-container">
            <div className="about-left">
                <h1>
                    Welcome to <br /> The world of <br /> <span>
                    Tasty & Fresh Food
                    </span> 
                </h1>
                <h4>
                    "Better you will feel if you eat a Food <span>Fire</span>Healthy meal"
                </h4> 
                <Outlet/>
            </div>
            <div className="about-right">
                <img src={food} alt="food image" />
            </div>
        </div>
    )
}

export default About;