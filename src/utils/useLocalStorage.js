import { useState, useEffect }  from 'react';

export const useLocalStorage = (key) => {
    const [value, setValue] = useState(() => {
        //NOTE: All the values are stored in local storage as strings.So, we have to convert it to json object before use using JSON.parse()
        const value_string = window.localStorage.getItem(key);
        return JSON.parse(value_string) || [];  //default value is [] if no value is there in the key
    });

    
    useEffect(() => {
        //Note : Any JSON must be convert to string before setting in local storage.
        window.localStorage.setItem(key, JSON.stringify(value));
    },[key, value]);

    return[value, setValue];
};

export default useLocalStorage;