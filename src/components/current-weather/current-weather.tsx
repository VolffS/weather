import './current-weather.scss';
import locationSvg from '../../assets/location.svg';
import {WeatherData} from '../../type/weather-data.ts';

export const CurrentWeather = ({currentWeather}: {currentWeather: WeatherData}) => {
	return (
		<div className="container">
			<div className="current-weather">
				<div className="current-weather__up">
					<h2>{currentWeather.date.dayOfWeek}</h2>
					<p> {currentWeather.date.fullDate}</p>
					<div className="current-location">
						<img
							src={locationSvg}
							alt=""
						/>
						<p> {currentWeather.location}</p>
					</div>
				</div>
				<div className="current-weather__down">
					<div className="img-container">
						<img
							className="current-weather__img"
							src={currentWeather.weather.img.urlImg}
							alt=""
						/>
					</div>
					<p className="current-weather__down__temp">{currentWeather.weather.tempText}</p>
					<p className="current-weather__down__info">{currentWeather.weather.weatherDescription}</p>
				</div>
			</div>
		</div>
	);
};
