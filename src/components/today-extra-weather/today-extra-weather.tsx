import './today-extra-weather.scss';
import {WeatherData} from '../../type/weather-data.ts';

export const TodayExtraWeather = ({todayWeather}: {todayWeather: WeatherData}) => {
	return (
		<div className="today-weather-container">
			<div className="today-info">
				<p className="today__title">Ощущается как</p>
				<p className="today__title-value">{todayWeather.weather.feels_likeText}</p>
			</div>
			<div className="today-info">
				<p className="today__title">Влажность</p>
				<p className="today__title-value">{todayWeather.weather.humidity} %</p>
			</div>
			<div className="today-info">
				<p className="today__title">Ветер</p>
				<p className="today__title-value">{todayWeather.weather.windSpeed} км/ч</p>
			</div>
		</div>
	);
};
