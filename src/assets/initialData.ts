import {WeatherData} from '../type/weather-data.ts';

export const initiationWeatherData: WeatherData = {
	id: 0,
	date: {
		dayOfWeek: 'Погоды нет',
		dayOfWeekShort: '',
		fullDate: '',
	},
	weather: {
		tempOrigin: 0,
		tempText: '',
		feels_likeOrigin: 0,
		feels_likeText: '',
		humidity: 0,
		weatherDescription: '',
		windSpeed: 0,
		img: {
			urlImg: '',
			urlImgShort: '',
		},
	},
	location: '',
};
