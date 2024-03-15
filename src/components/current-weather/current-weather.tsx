import './current-weather.scss';
import locationSvg from '../../assets/location.svg';
import {formattingWeatherByDate, Metric} from '../../helpers/helpers.ts';
import {TodayWeather} from '../../type/today-weather.ts';
import {Location} from '../../type/location.ts';
import {Weather} from '../../type/weather.ts';
import {useContext} from 'react';
import {WeatherContextData} from '../../hooks/weather-context-data.ts';

export const CurrentWeather = ({weather}: {weather: {location: Location; weather: Weather}}) => {
	const weatherMetric: Metric = useContext(WeatherContextData).temperatureMetric;
	const weatherData: TodayWeather = formattingWeatherByDate(weather, weatherMetric);

	return (
		<div className="container">
			<div className="current-weather">
				<div className="current-weather__up">
					<h2>{weatherData.dayOfWeek}</h2>
					<p> {weatherData.fullDate}</p>
					<div className="current-location">
						<img
							src={locationSvg}
							alt=""
						/>
						<p> {weatherData.location}</p>
					</div>
				</div>
				<div className="current-weather__down">
					<div className="img-container">
						<img
							className="current-weather__img"
							src={weatherData.urlImg}
							alt=""
						/>
					</div>
					<p className="current-weather__down__temp">{weatherData.temperature}</p>
					<p className="current-weather__down__info">{weatherData.weatherDescription}</p>
				</div>
			</div>
		</div>
	);
};
