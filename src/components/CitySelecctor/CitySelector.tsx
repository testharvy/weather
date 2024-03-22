import {APIKEY} from "../../api.ts";
import {useState} from "react";
import {ICity} from "../../types.ts"
import { useDebouncedCallback  } from "use-debounce";
import axios from "axios";
import styles from "./CitySelector.module.css";


type Props ={
    city: ICity|null
    setCity: (value:ICity)=>void
}

function CitySelector({city, setCity}:Props) {
    const [cityName, setCityName] = useState<string>('')
    const [cityList, setCityList] = useState<ICity[]>([]);
    const showOption = (cityName != '') && cityList.length>0;


    const debounced = useDebouncedCallback(
        (value) => {
            axios.get<ICity[]>(`http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${APIKEY}`)
                .then(function (response) {
                    const arr = response.data;
                    setCityList(arr);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }, 500);

    const handleCitySelect = function (event: React.ChangeEvent<HTMLInputElement>){
        setCityName(event.target.value);
        debounced(event.target.value);
    }

    const updateCity = function (city:ICity){
        setCity(city);
        setCityName('');
        setCityList([]);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if(cityList.length>0){
                updateCity(cityList[0])
            }
        }
    }

    const changeCityHandle = (city:ICity) => {
        updateCity(city)
    }

    return (
        <>
            <div className={styles.inputWrapper}>
                <input className={styles.input}
                       type="text"
                       placeholder={'Выберите город'}
                       value={cityName}
                       onKeyDown={handleKeyDown}
                       onChange={(e) => {handleCitySelect(e)}}/>


                {showOption && <div className={styles.dropdown}>
                    {cityList.map((city, index)=>{
                        return (
                            <div className={styles.dropdownItem} key={index} onClick={()=>changeCityHandle(city)}>
                                {city?.local_names?.ru ? city?.local_names?.ru : city.name} ({city.country})<br/>
                                Ш:{city.lat} Д:{city.lon}
                            </div>

                        )
                    })}
                </div>
                }

            </div>
            <br/>
            {city && <>
                <div className={'title'}>Город: {city?.local_names?.ru ? city?.local_names?.ru : city.name} ({city.country})</div>
            </>}
        </>
    )
}

export default CitySelector
