import './side-information.scss'
import {TodayExtraWeather} from "../today-extra-weather/today-extra-weather.tsx";
import {WeekInfo} from "../week-info/week-info.tsx";
import locationSvg from "../../assets/location.svg";

export const SideInformation = () => {
    return <div className="side-information">
        <TodayExtraWeather/>
        <WeekInfo/>
        <button className="select-location">
            <img src={locationSvg} alt=""/>
            <p>Выбрать локацию</p>
        </button>
    </div>;
}