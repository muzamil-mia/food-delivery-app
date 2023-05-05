
import { useState } from "react";
import FoodFireLogo from "../images/Food Fire Logo.png"
import { Link, useNavigate } from "react-router-dom"  //imported link for client side routing

const Title = () => {
    return (
        <>
            <a href="/">
                <img src={FoodFireLogo} alt="Food Fire Logo" title="Food Fire" className="logo" />
            </a>
        </>
    )
}

//Header component for header section: logo, nav items

const Header = () => {

    // use useState for user logged in or logged out
    const [isLoggedin, setIsLoggedin] = useState(true);
    const navigate = useNavigate();

    return (
        <div className="header">
            <Title />
            <div className="nav-items">
                <ul>
                    <li>
                        <Link to = "/" >Home</Link>
                    </li>
                    <li>
                    <Link to="/about">About</Link>
                    </li>
                    <li>
                    <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <i class="ri-shopping-cart-line"></i>
                    </li>
                    <li>
                        {/* use conditional rendering for login and logout */}
                        {isLoggedin ? (
                            <button className="logout-btn" onClick={() => setIsLoggedin(false)}>Logout</button>
                        ) : (
                            <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header;