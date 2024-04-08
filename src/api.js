const API_KEY='dc85cbee5a0528179ceebaa9af69b4f6';

const getweather=async (city) => {
    return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    .then((res)=>res.json())
    .then((json)=>{
        return json;
    })
};

export default getweather; 