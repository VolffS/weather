import './current-weather.scss'
import locationSvg from '../../assets/location.svg'
import {weatherImg} from "../../assets/weather-img.ts";
export const CurrentWeather = () => {
    return (
        <div className="container">
            <div className="current-weather">
                <div className="current-weather__up">
                    <h2>Понедельник</h2>
                    <p> 12 Mar 2024</p>
                    <div className="current-location">
                        <img src={locationSvg} alt=""/>
                        <p> Paris, FR </p>
                    </div>
                </div>
                <div className="current-weather__down">
                    <img className="current-weather__img" src={weatherImg.sun} alt=""/>
                    <p className="current-weather__down__temp">29°C</p>
                    <p className="current-weather__down__info">Sunny</p>
                </div>
            </div>
        </div>
    );
}