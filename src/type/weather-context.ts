import {TemperatureMetric} from '../helpers/helpers.ts';
export interface WeatherContext {
	activeDay: number;
	temperatureMetric: TemperatureMetric;
}
