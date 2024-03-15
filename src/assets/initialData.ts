import {Location} from '../type/location.ts';
import {Weather} from '../type/weather.ts';

export const initiationLocation: Location = {
	name: '',
	lat: 0,
	lon: 0,
	state: '',
	country: '',
};

export const initiationWeather: Array<Weather> = [
	{
		main: {
			temp: 0,
			humidity: 0,
			feels_like: 0,
		},
		weather: [
			{
				id: 0,
				description: '',
				icon: '',
			},
		],
		wind: {
			speed: 0,
		},
		dt_txt: '0000-00-00',
	},
];
