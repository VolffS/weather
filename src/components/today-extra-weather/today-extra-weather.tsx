import './today-extra-weather.scss'
import {Weather} from "../../type/weather.ts";
export const TodayExtraWeather = ({currentWeather}:{currentWeather: Weather}) => {
    return <div className="today-weather-container">
        <div className="today-info">
            <p className="today__title">Ощущается как</p>
            <p className="today__title-value">{Math.floor(currentWeather.main.feels_like)}°C</p>
        </div>
        <div className="today-info">
            <p className="today__title">Влажность</p>
            <p className="today__title-value">{currentWeather.main.humidity} %</p>
        </div>
        <div className="today-info">
            <p className="today__title">Ветер</p>
            <p className="today__title-value">{currentWeather.wind.speed} км/ч</p>
        </div>
    </div>;
}