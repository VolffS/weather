import {createContext} from 'react';
import {TemperatureMetric} from '../helpers/helpers.ts';
import {WeatherContext} from '../type/weather-context.ts';

export const WeatherContextData = createContext<WeatherContext>({
	activeDay: 0,
	temperatureMetric: TemperatureMetric.celsius,
});
