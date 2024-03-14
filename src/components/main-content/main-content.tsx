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
import {Metric} from "../../helpers/helpers.ts";


export const MainContent = () => {
    const [stateWeather, setStateWeather] = useState<WeatherData>({
        location: initiationLocation,
        weathers: initiationWeather
    });
    const [isCountrySearch, setIsCountrySearch] = useState<boolean>(false);
    const [weatherDay, setWeatherDay] = useState<number>(0);
    const [weatherMetric, setWeatherMetric] = useState<Metric>(Metric.celsius);

    function fillDataWeather(location: Location): void {
        setWeatherDay(0);
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

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(successGetCurrentPosition);
        window.addEventListener("keydown", downEscapeHandler)
        window.addEventListener("mouseup", mouseupCancelHandler)
    }, []);

    function successGetCurrentPosition(pos: Geolocation): void {
        const crd: Coordinates = pos.coords;
        requestLocationRevers(crd.latitude, crd.longitude).then(location => {
            fillDataWeather(location.location)
        })
    }
    const downEscapeHandler = (ev: KeyboardEvent): void => {
        if (ev.key == "Escape") {
            setIsCountrySearch(false);
        }
    }
    const mouseupCancelHandler = (ev: MouseEvent): void => {
        if (ev.target !== null) {
            if (!ev.target.classList.value.includes("search")) {
                setIsCountrySearch(false);
            }
        }
    }

    const changeIsCountrySearch = (): void => {
        setIsCountrySearch(!isCountrySearch);
    }

    const selectWeatherDay = (day: number): void => {
        if (weatherDay === day) {
            setWeatherDay(0);
        } else {
            setWeatherDay(day);
        }
    }
    const changeWeatherMetric = (metric: Metric):void => {
        if (weatherMetric !== metric) {
            if (metric === Metric.celsius) {
                for (const weather of stateWeather.weathers) {
                    weather.main.temp = weather.main.temp * 1.8 + 32
                    weather.main.feels_like = weather.main.feels_like * 1.8 + 32
                }
            } else {
                for (const weather of stateWeather.weathers) {
                    weather.main.temp = (weather.main.temp - 32) / 1.8;
                    weather.main.feels_like = (weather.main.feels_like - 32) /1.8;
                }
            }
            setWeatherMetric(metric)
        }
    }

    return (
        <main>
            <div className="main-container">
                <div className="select-metric">
                    <button onClick={()=>{changeWeatherMetric(Metric.celsius)}}>°C</button>
                    <button onClick={()=>{changeWeatherMetric(Metric.fahrenheit)}}>°F</button>
                </div>
                <div className="main-content">
                    <CurrentWeather weather={stateWeather} weatherDay={weatherDay} currentMetric={weatherMetric}/>
                    <SideInformation onBtnClick={changeIsCountrySearch}
                                     useWeatherDay={{selectWeatherDay, weatherDay}}
                                     weather={stateWeather.weathers}
                                     currentMetric={weatherMetric}
                    />
                </div>
            </div>

            {isCountrySearch &&
                <CountrySearch fillDataWeather={fillDataWeather} endCountrySearch={changeIsCountrySearch}/>}
        </main>
    );
}

