import {Metric} from '../helpers/helpers.ts';

export interface WeatherContext {
	activeDay: number;
	temperatureMetric: Metric;
}
