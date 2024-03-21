import {useState} from 'react';
import {WeatherData} from '../type/weather-data.ts';
import {initiationWeatherData} from '../assets/initialData.ts';
import {requestWeatherFiveDays} from '../helpers/request-api.ts';
import {
	conversionTemp,
	formattingCelsius,
	formattingFahrenheit,
	formattingKelvin,
	formattingWeeksWeatherData,
	TemperatureMetric,
} from '../helpers/helpers.ts';
import {Location} from '../type/location.ts';
import {WeatherRequest} from '../type/weatherRequest.ts';
import {WeatherState} from '../type/weatherState.ts';

export const useWeather = (): WeatherState => {
	const [weatherData, setWeatherData] = useState<Array<WeatherData>>([initiationWeatherData]);
	const [isLoad, setIsLoad] = useState<boolean>(false);

	const getWeatherByHour = (weather: any, hour: number): Array<WeatherRequest> => {
		return weather.list.filter((day: WeatherRequest) => {
			const date = new Date(day.dt_txt).getHours();
			if (date === hour) {
				return day;
			}
		});
	};
	const refreshStateWeather = (location: Location, metric: TemperatureMetric): void => {
		setIsLoad(true);
		requestWeatherFiveDays(location.lat, location.lon)
			.then((weatherForecast) => {
				const days: Array<WeatherRequest> = [];
				days.push(weatherForecast.weather.list[0]);
				days.push(...getWeatherByHour(weatherForecast.weather, 9));
				const weatherData: Array<WeatherData> = formattingWeeksWeatherData(
					{location: location, weathers: days.slice(0, 5)},
					metric,
				);
				setWeatherData(weatherData);
			})
			.finally(() => setIsLoad(false));
	};

	const changeWeatherMetric = (metric: TemperatureMetric): void => {
		for (const weather of weatherData) {
			weather.weather.tempText = `${conversionTemp(weather.weather.tempOrigin, metric)}${metric}`;
			weather.weather.feels_likeText = `${conversionTemp(weather.weather.feels_likeOrigin, metric)}${metric}`;
		}
	};

	return {
		isLoad,
		weatherData,
		refreshStateWeather,
		changeWeatherMetric,
	};
};
