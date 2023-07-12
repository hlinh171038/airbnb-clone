import countries from 'world-countries';
 

// take value:.cca2 (alphabet 2)
// lable: common (common name in English)
// latlng (latitude and longitude )
//....
const formattedCountries = countries.map((country)=>({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region
}));
const useCountries = () =>{
    // get all information and assign to getAll function
    const getAll = () =>formattedCountries;
    // get by value
    const getByValue = (value:string)=>{
        return formattedCountries.find((item)=>item.value === value)
    }
    return {
        getAll,
        getByValue
    }
}

export default useCountries

// allow to get information data about all country in the world