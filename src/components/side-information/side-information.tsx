import './side-information.scss'
import {TodayExtraWeather} from "../today-extra-weather/today-extra-weather.tsx";
import {WeekInfo} from "../week-info/week-info.tsx";
import locationSvg from "../../assets/location.svg";
import {Weather} from "../../type/weather.ts";
import {Metric} from "../../helpers/helpers.ts";

export const SideInformation = ({weather, onBtnClick, useWeatherDay, currentMetric}: {
    weather: Array<Weather>,
    onBtnClick: () => void,
    currentMetric: Metric,
    useWeatherDay: {
        selectWeatherDay: (day: number) => void,
        weatherDay: number
    }
}) => {

    return <div className="side-information">
        <TodayExtraWeather currentWeather={weather[useWeatherDay.weatherDay]} currentMetric={currentMetric}/>
        <WeekInfo weatherInfo={weather} onDayClick={useWeatherDay} currentMetric={currentMetric}/>
        <button className="select-location" onClick={onBtnClick}>
            <img src={locationSvg} alt=""/>
            <p>Выбрать локацию</p>
        </button>
    </div>;
}