import './week-info.scss';
import {Weather} from '../../type/weather.ts';
import {formattingWeeksWeatherData} from '../../helpers/helpers.ts';
import {WeeksWeatherData} from '../../type/weeks-weather-data.ts';
import {useContext} from 'react';
import {WeatherContextData} from '../../hooks/weather-context-data.ts';
import {WeatherContext} from '../../type/weather-context.ts';

export const WeekInfo = ({
	weather,
	onDayClick,
}: {
	weather: Array<Weather>;
	onDayClick: (day: number) => void;
}) => {
	const weatherContext: WeatherContext = useContext(WeatherContextData);
	const dataWeek: Array<WeeksWeatherData> = formattingWeeksWeatherData(weather.slice(1));
	const dayIndex = weatherContext.activeDay - 1;

	return (
		<div className="week-container">
			<ul className="next-days">
				{dataWeek.map((value: WeeksWeatherData, index: number) => {
					const classWeatherDay = `next-days__weather ${dayIndex === index ? 'active' : ''}`;
					return (
						<li
							className={classWeatherDay}
							onClick={() => onDayClick(index + 1)}
							role="listitem"
							key={value.dayOfWeek}
						>
							<img
								src={value.urlImg}
								alt=""
							/>
							<p className="day-of-week">{value.dayOfWeek}</p>
							<p className="day-temp">
								{value.temp}
								{weatherContext.temperatureMetric}
							</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
