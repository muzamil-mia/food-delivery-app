

import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { swiggy_api_URL } from '../constants';
import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCrad";

//Filter the restaurant data according input type
function filterData(searchText, restaurants) {
    const filterData = restaurants.filter((restaurant) =>
        restaurant?.data?.name.toLowerCase().includes(searchText.toLowerCase())
    );
    //console.log(filterData)
    return filterData
}

const Body = () => {

    //useState: to create a state variable, searchText, allRestaurants, and filteredRestaurants is local state variable
    const [searchText, setSearchText] = useState("");
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    //useEffect for one time call getRestaurants using empty dependency array
    useEffect(() => {
        getRestaurants();
    }, [])

    //async function get Restaurant to fetch Swiggy Api data
    async function getRestaurants() {
        //handle the error using try... catch
        try {
            const data = await fetch(swiggy_api_URL);
            const json = await data.json();
            //update state variable restaurants with Swiggy Api data

            //console.log(json)

            setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards);
            setFilteredRestaurants(json?.data?.cards[2].data?.data?.cards);
            // setAllRestaurants(json?.data?.cards[2]?.data)
        } catch (error) {
            console.log(error);
        }
    }

    // us searchData function and set condition if data is empty show error message
    const searchData = (searchText, restaurants) => {
        if (searchText !== "") {
            const data = filterData(searchText, restaurants);
            setFilteredRestaurants(data);
            setErrorMessage("");
            if (data.length === 0) {
                setErrorMessage("No matches restaurant found");
            }
        } else {
            setErrorMessage("");
            setFilteredRestaurants(restaurants);
        }
    };

    // if allRestaurants is empty don't render restaurants cards
    if (!allRestaurants) return null;


    return (
        <>
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search a restaurant you want..."
                    value={searchText}
                    // update the state variable searchText when we typing in input box
                    onChange={(e) => setSearchText(e.target.value)}
                ></input>

                <button className="search-btn" onClick={() => {
                    //user click on button searchData function is called
                    searchData(searchText, allRestaurants);
                }}>Search</button>
            </div>

            {errorMessage && <div className="error-container">{errorMessage}</div>}

            {/* if restaurants data is not fetched then display Shimmer UI after the fetched data display restaurants cards */}
            {allRestaurants?.length === 0 ? (
                <Shimmer />
            ) : (
                <div className="restaurant-list">
                    {/* We are mapping restaurants array and passing JSON array data to RestaurantCard component as props with unique key as restaurant.data.id */}
                    {filteredRestaurants.map((restaurant) => {
                        return (
                            <Link
                                to={"/restaurant/" + restaurant.data.id}
                                key={restaurant.data.id}
                            >
                                <RestaurantCard {...restaurant.data} />
                            </Link>
                        );
                    })}
                </div>
            )}
        </>
    )
}

export default Body;