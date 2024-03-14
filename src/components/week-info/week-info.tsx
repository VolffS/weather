import './week-info.scss'
import {Weather} from "../../type/weather.ts";
import {formattingWeeksWeatherData, Metric} from "../../helpers/helpers.ts";
import {WeeksWeatherData} from "../../type/weeks-weather-data.ts";

export const WeekInfo = ({weatherInfo, onDayClick, currentMetric}: {
    weatherInfo: Array<Weather>,currentMetric: Metric , onDayClick: {
        selectWeatherDay: (day: number) => void,
        weatherDay: number
    }
}) => {
    const dataWeek: Array<WeeksWeatherData> = formattingWeeksWeatherData(weatherInfo);

    return (
        <div className="week-container">
            <ul className="next-days">
                {dataWeek.map((value: WeeksWeatherData, index: number) => {
                        const classWeatherDay = `next-days__weather ${onDayClick.weatherDay - 1 === index ? "active" : ""}`;
                        return <li className={classWeatherDay} id={++index} onClick={(ev) => {
                            onDayClick.selectWeatherDay(+ev.currentTarget.id);
                        }} role="listitem" key={value.id + value.dayOfWeek}>
                            <img src={value.urlImg} alt=""/>
                            <p className="day-of-week">{value.dayOfWeek}</p>
                            <p className="day-temp">{value.day}{currentMetric}</p>
                        </li>
                    }
                )}
            </ul>
        </div>
    );
}