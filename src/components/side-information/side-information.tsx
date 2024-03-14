import './side-information.scss'
import {TodayExtraWeather} from "../today-extra-weather/today-extra-weather.tsx";
import {WeekInfo} from "../week-info/week-info.tsx";
import locationSvg from "../../assets/location.svg";
import {Weather} from "../../type/weather.ts";

export const SideInformation = ({weather, onBtnClick}:{weather: Array<Weather>, onBtnClick:()=>void}) => {

    return <div className="side-information">
        <TodayExtraWeather currentWeather={weather[0]}/>
        <WeekInfo weatherInfo={weather}/>
        <button className="select-location" onClick={onBtnClick}>
            <img src={locationSvg} alt=""/>
            <p>Выбрать локацию</p>
        </button>
    </div>;
}