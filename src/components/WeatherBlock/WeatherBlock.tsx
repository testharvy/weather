import {IWeather} from "../../types.ts";

type Props = {
    weather: IWeather|null
}

function  WeatherBlock({weather}:Props) {
    return(
        <div>
            {weather && <div className={'weather'}>
                {weather.weather.length>0 && <>
                    <img src={"http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png"} alt={weather.weather[0].main}/><br/>
                Погода: {weather.weather[0].description}<br/>
            </>}
                Температура: {weather.main.temp} °C
            </div>
            }
        </div>
    )
}

export default WeatherBlock