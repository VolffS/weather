import './main-content.scss';
import {SideInformation} from "../side-information/side-information.tsx";
import {CurrentWeather} from "../current-weather/current-weather.tsx";
import {useEffect, useState} from "react";
import {initiationLocation, initiationWeather} from "../../assets/initialData.ts";
import {WeatherData} from "../../type/weather-data.ts";
import {CountrySearch} from "../country-search/country-search.tsx";
import {Location} from "../../type/location.ts";
import {requestLocationRevers, requestWeatherFiveDays} from "../../helpers/request-api.ts";
import {Coordinates} from "../../type/coordinates.ts";
import {Geolocation} from "../../type/geolocation.ts";


export const MainContent = () => {
    const [stateWeather, setStateWeather] = useState<WeatherData>({
        location: initiationLocation,
        weathers: initiationWeather
    });
    const [isCountrySearch, setIsCountrySearch] = useState<boolean>(false);

    function fillDataWeather(location: Location): void {
        requestWeatherFiveDays(location.lat, location.lon).then(
            weatherForecast => {
                const days = [];
                days.push(
                    ...weatherForecast.weather.list.filter((day) => {
                        const date = new Date(day.dt_txt).getHours();
                        if (date === 9) {
                            return day;
                        }
                    })
                );
                const weatherData: WeatherData = {
                    location: location,
                    weathers: days,
                }
                setStateWeather(weatherData);
            }
        )
    }

    function success(pos: Geolocation): void {
        const crd: Coordinates = pos.coords;
        requestLocationRevers(crd.latitude, crd.longitude).then(location => {
            fillDataWeather(location.location)
        })
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success)
    }, []);

    const changeIsCountrySearch = () => {
        setIsCountrySearch(!isCountrySearch);
    }

    return (
        <main>
            <div className="main-content">
                <CurrentWeather currentWeather={stateWeather}/>
                <SideInformation onBtnClick={changeIsCountrySearch} weather={stateWeather.weathers}/>
            </div>
            {isCountrySearch &&
                <CountrySearch fillDataWeather={fillDataWeather} endCountrySearch={changeIsCountrySearch}/>}
        </main>
    );
}

