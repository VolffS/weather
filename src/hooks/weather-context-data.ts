import {createContext} from 'react';
import {Metric} from '../helpers/helpers.ts';
import {WeatherContext} from '../type/weather-context.ts';

export const WeatherContextData = createContext<WeatherContext>({
	activeDay: 0,
	temperatureMetric: Metric.celsius,
});
