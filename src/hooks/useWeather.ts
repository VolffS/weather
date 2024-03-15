import {useState} from 'react';
import {WeatherData} from '../type/weather-data.ts';
import {initiationLocation, initiationWeather} from '../assets/initialData.ts';
import {requestWeatherFiveDays} from '../helpers/request-api.ts';
import {formattingCelsius, formattingFahrenheit, Metric} from '../helpers/helpers.ts';
import {Location} from '../type/location.ts';
import {Weather} from '../type/weather.ts';
import {UseWeather} from '../type/use-weather.ts';

export const useWeather = (): UseWeather => {
	const [stateWeather, setStateWeather] = useState<WeatherData>({
		location: initiationLocation,
		weathers: initiationWeather,
	});
	const [isLoad, setIsLoad] = useState<boolean>(false);

	const getWeatherByHour = (weather: any, hour: number, metric: Metric): Array<Weather> => {
		return weather.list.filter((day: Weather) => {
			const date = new Date(day.dt_txt).getHours();
			if (metric === Metric.fahrenheit) {
				day.main.temp = formattingFahrenheit(day.main.temp);
				day.main.feels_like = formattingFahrenheit(day.main.feels_like);
			}
			if (date === hour) {
				return day;
			}
		});
	};
	const refreshStateWeather = (location: Location, metric: Metric): void => {
		setIsLoad(true);
		requestWeatherFiveDays(location.lat, location.lon)
			.then((weatherForecast) => {
				const days: Array<Weather> = [];
				days.push(weatherForecast.weather.list[0]);
				days.push(...getWeatherByHour(weatherForecast.weather, 9, metric));
				const weatherData: WeatherData = {
					location: location,
					weathers: days.slice(0, 5),
				};
				setStateWeather(weatherData);
			})
			.finally(() => setIsLoad(false));
	};

	const changeWeatherMetric = (metric: Metric): void => {
		if (metric === Metric.celsius) {
			for (const weather of stateWeather.weathers) {
				weather.main.temp = formattingCelsius(weather.main.temp);
				weather.main.feels_like = formattingCelsius(weather.main.feels_like);
			}
		} else {
			for (const weather of stateWeather.weathers) {
				weather.main.temp = formattingFahrenheit(weather.main.temp);
				weather.main.feels_like = formattingFahrenheit(weather.main.feels_like);
			}
		}
	};

	const getForecastForDay = (indexDay: number): {location: Location; weather: Weather} => {
		return {
			location: stateWeather.location,
			weather: stateWeather.weathers[indexDay],
		};
	};

	return {
		isLoad,
		stateWeather,
		refreshStateWeather,
		changeWeatherMetric,
		getForecastForDay,
	};
};
