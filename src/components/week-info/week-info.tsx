import './week-info.scss'
import {Weather} from "../../type/weather.ts";
import {formattingWeeksWeatherData} from "../../helpers/helpers.ts";
import {WeeksWeatherData} from "../../type/weeks-weather-data.ts";

export const WeekInfo = ({weatherInfo}:{weatherInfo: Array<Weather>}) => {

    const dataWeek: Array<WeeksWeatherData> = formattingWeeksWeatherData(weatherInfo);

    return (
        <div className="week-container">
            <ul className="next-days">
                {dataWeek.map((value) =>
                    <li className="next-days__weather" key={value.id+value.dayOfWeek}>
                        <img src={value.urlImg} alt=""/>
                        <p className="day-of-week">{value.dayOfWeek}</p>
                        <p className="day-temp">{value.day}</p>
                    </li>
                )}
            </ul>
        </div>
    );
}