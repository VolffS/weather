import './week-info.scss'
import {weatherImg} from "../../assets/weather-img.ts";

export const WeekInfo = () => {
    return (
        <div className="week-container">
            <ul className="next-days">
                <li className="next-days__weather">
                    <img src={weatherImg.sun} alt=""/>
                    <p className="day-of-week">Пн</p>
                    <p className="day-temp">1</p>
                </li>
                <li className="next-days__weather">
                    <img src={weatherImg.cloud} alt=""/>
                    <p className="day-of-week">Вт</p>
                    <p className="day-temp">2</p>
                </li>
                <li className="next-days__weather">
                    <img src={weatherImg.rain} alt=""/>
                    <p className="day-of-week">Ср</p>
                    <p className="day-temp">3</p>
                </li>
                <li className="next-days__weather">
                    <img src={weatherImg.storm} alt=""/>
                    <p className="day-of-week">Чт</p>
                    <p className="day-temp">4</p>
                </li>
            </ul>
        </div>
    );
}