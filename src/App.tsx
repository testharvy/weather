import './App.css'
import {useEffect, useState} from "react";
import {ICity, IWeather} from "./types.ts"
import {APIKEY} from "./api.ts"
import axios from "axios";
import CitySelector from "./components/CitySelecctor/CitySelector.tsx";
import WeatherBlock from "./components/WeatherBlock/WeatherBlock.tsx";



//
function App() {
    const [city, setCity] = useState<ICity|null>(null);
    const [weather, setWeather] = useState<IWeather|null>(null);



    useEffect(() => {
        if(city!=null){
            axios.get<IWeather>(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${APIKEY}&units=metric&lang=ru`)
                .then(function (response) {
                    const weather = response.data;
                    setWeather(weather);

                })
                .catch(function (error) {
                    console.log(error);
                });
        }


    }, [city]);

    return(
        <div className={'content'}>
            <h1>Погода </h1>
            <CitySelector city={city} setCity={setCity}></CitySelector>
            <WeatherBlock weather={weather}></WeatherBlock>
        </div>
    )
}
export default App
