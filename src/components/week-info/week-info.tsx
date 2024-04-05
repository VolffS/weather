import './week-info.scss';
import {useContext} from 'react';
import {WeatherContextData} from '../../hooks/weather-context-data.ts';
import {WeatherContext} from '../../type/weather-context.ts';
import {WeatherData} from '../../type/weather-data.ts';

export const WeekInfo = ({
	weathersForecast,
	onDayClick,
}: {
	weathersForecast: Array<WeatherData>;
	onDayClick: (day: number) => void;
}) => {
	const weatherContext: WeatherContext = useContext(WeatherContextData);
	const dayIndex = weatherContext.activeDay - 1;
	const weatherForecast4Days = weathersForecast.slice(1);

	return (
		<div className="week-container">
			<ul className="next-days">
				{weatherForecast4Days.map((value, index: number) => {
					const classWeatherDay = `next-days__weather ${dayIndex === index ? 'active' : ''}`;
					return (
						<li
							className={classWeatherDay}
							onClick={() => onDayClick(index + 1)}
							role="listitem"
							key={value.date.dayOfWeek}
						>
							<img
								src={value.weather.img.urlImgShort}
								alt=""
							/>
							<p className="day-of-week">{value.date.dayOfWeekShort}</p>
							<p className="day-temp">{value.weather.tempText}</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
