import './side-information.scss';
import {TodayExtraWeather} from '../today-extra-weather/today-extra-weather.tsx';
import {WeekInfo} from '../week-info/week-info.tsx';
import locationSvg from '../../assets/location.svg';
import {useContext} from 'react';
import {WeatherContextData} from '../../hooks/weather-context-data.ts';
import {WeatherData} from '../../type/weather-data.ts';

export const SideInformation = ({
	weather,
	onCountrySearch,
	selectWeatherDay,
}: {
	weather: Array<WeatherData>;
	onCountrySearch: () => void;
	selectWeatherDay: (day: number) => void;
}) => {
	const activeDay: number = useContext(WeatherContextData).activeDay;
	return (
		<div className="side-information">
			<TodayExtraWeather todayWeather={weather[activeDay]} />
			<WeekInfo
				weathersForecast={weather}
				onDayClick={selectWeatherDay}
			/>
			<button
				className="select-location"
				onClick={onCountrySearch}
			>
				{}
				<img
					src={locationSvg}
					alt=""
				/>
				<p>Выбрать локацию</p>
			</button>
		</div>
	);
};
