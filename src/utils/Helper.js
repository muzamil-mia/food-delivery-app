//Filter the restaurant data according input type
 export function filterData(searchText, restaurants) {
    const filterData = restaurants.filter((restaurant) =>
        restaurant?.data?.name.toLowerCase().includes(searchText.toLowerCase())
    );
    //console.log(filterData)
    return filterData
}
