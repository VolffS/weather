import {Coordinate} from './coordinate.ts';

export interface Geolocation {
	coords: Coordinate;
	timestamp: number;
}
