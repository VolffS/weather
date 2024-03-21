import {WeatherData} from './weather-data.ts';
import {TemperatureMetric} from '../helpers/helpers.ts';
import {Location} from './location.ts';

export interface WeatherState {
	isLoad: boolean;
	weatherData: Array<WeatherData>;
	refreshStateWeather: (location: Location, metric: TemperatureMetric) => void;
	changeWeatherMetric: (metric: TemperatureMetric) => void;
}
