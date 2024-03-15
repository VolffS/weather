import {WeatherData} from './weather-data.ts';
import {Metric} from '../helpers/helpers.ts';
import {Weather} from './weather.ts';
import {Location} from './location.ts';

export interface UseWeather {
	isLoad: boolean;
	stateWeather: WeatherData;
	refreshStateWeather: (location: Location, metric: Metric) => void;
	changeWeatherMetric: (metric: Metric) => void;
	getForecastForDay: (indexDay: number) => {location: Location; weather: Weather};
}
