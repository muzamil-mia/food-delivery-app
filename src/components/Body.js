
import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { swiggy_api_URL } from '../constants';
import { Link } from "react-router-dom";
import { filterData } from "../utils/Helper";
import useOnline from "../utils/useOnline";
import useLocalStorage from "../utils/useLocalStorage";

const Body = () => {

    //useState: to create a state variable, searchText, allRestaurants, and filteredRestaurants is local state variable
    const [searchText, setSearchText] = useState();
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const isOnline = useOnline();  //custom hook
    const [isFavourite, setIsFavourite] = useState(false);
    const [favRestaurants, setFavRestaurants] = useLocalStorage("fav")  //custom hook


    //useEffect for one time call getRestaurants using empty dependency array
    useEffect(() => {
        getRestaurants();
    }, [])

    //async function get Restaurant to fetch Swiggy Api data
    const getRestaurants = async () => {
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
    };


    // us searchData function and set condition if data is empty show error message
    const searchData = (searchText, restaurants) => {
        if (searchText !== "") {
            const data = filterData(searchText, restaurants);
            setFilteredRestaurants(data);
            setErrorMessage("");
            if (data.length === 0) {
                setErrorMessage("No matches found");
            }
        } else {
            if (errorMessage) setErrorMessage('');
            setAllRestaurants(allRestaurants);
        }
    };

    if (!isOnline) {
        // console.log('isOnline is false');
        return (
            <div className="container">
                <h1 className="font-bold text-red text-3xl text-center">Offline, please check your internet connection </h1>
            </div>
        )
    }


    const addFavourite = (props) => {
        //  console.log(props)
        //  console.log(props?.id)

        //if restaurant is not marked fav, then add to local storage
        if (!favRestaurants.find(restaurant => restaurant?.data?.id === props.id)) {

            setFavRestaurants([...favRestaurants, props]);
        } else {
            //if restaurant is already in local storage, then remove from it.
            const modifiedFavRestaurants = favRestaurants.filter((restaurant) => restaurant?.data?.id !== props?.id)
            setFavRestaurants(modifiedFavRestaurants);
        }
    }

    const showFavouriteRestaurants = () => {
        console.log(favRestaurants)
        if (isFavourite) {
            if (errorMessage) setErrorMessage('');
            setFilteredRestaurants(allRestaurants);
        } else {
            if (favRestaurants.length === 0) {
                setErrorMessage('No favourites');
                setFilteredRestaurants([]);
            } else {
                setFilteredRestaurants(favRestaurants);
            }
        }
        setIsFavourite(!isFavourite);
    }


    // if allRestaurants is empty don't render restaurants cards
    if (!allRestaurants) {
        //console.log("early return")
        return null;
    }
    return (
        <>
            <div className="container">
                <div className="flex justify-start mob:flex:col">
                    <div className="flex justify-evenly min-w-[500px] mob:min-w-[375px] h-[100px] mob:h-[50px] items-center m-auto">
                        <input
                            type="text"
                            placeholder="Search for a restaurant..."
                            value={searchText}
                            className="outline-none text-base mob:text-xs p-[5px] basis-[350px] mob:basis-[270px] h-[30px] rounded-md ring-1 ring-gray bg-gray" key="input-text"
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <button
                            className="btn btn--primary  basis-[60px] mob:basis-[50px] mob:text-xs"
                            onClick={() => {
                                searchData(searchText, allRestaurants);
                            }}>
                            Search
                        </button>
                    </div>
                    <div className="flex justify-end h-[100px] items-center m-auto mob:h-[50px]">
                        <button className={isFavourite ? "btn btn--primary px-[5px] mob:basis-[50px] mob:text-xs" : "btn btn--secondary px-[5px] mob:basis-[50px] mob:text-xs"} onClick={() => { showFavouriteRestaurants() }}>Favourites</button>
                    </div>
                </div>

                {errorMessage && <div className="h-14 m-auto text-center" id="error"><span className="error-txt w-14 h-8" id="error-msg">{errorMessage}</span></div>}

                {/* if restaurants data is not fetched then display Shimmer UI after the fetched data display restaurants cards */}
                {allRestaurants?.length === 0 ? (<Shimmer />) : (
                    <div className="flex flex-wrap gap-5 justify-center">
                        {/* We are mapping restaurants array and passing JSON array data to RestaurantCard component as props with unique key as restaurant.data.id */}
                        {filteredRestaurants.map((restaurant) => {
                            if (!restaurant || !restaurant.data || !restaurant.data.id) {
                                // Handle the case when the restaurant or its properties are undefined
                                return null;
                            }else
                            {/* console.log(restaurant.data) */ }
                            return (<Link
                                className="basis-[250px] p-2.5 mb-2.5 mob:basis-[150px]" to={"/restaurant/" + restaurant.data.id} key={restaurant.data.id}>
                                <RestaurantCard {...restaurant.data} key={restaurant.data.id} setRestaurants={addFavourite} />
                            </Link>
                            )
                        })}
                    </div>
                )}
            </div>
        </>
    );
};

export default Body;