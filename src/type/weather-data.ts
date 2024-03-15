import {Location} from './location.ts';
import {Weather} from './weather.ts';

export type WeatherData = {
	location: Location;
	weathers: Array<Weather>;
};
