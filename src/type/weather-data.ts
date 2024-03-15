export type WeatherData = {
	id: number;
	date: {
		dayOfWeek: string;
		dayOfWeekShort: string;
		fullDate: string;
	};
	weather: {
		tempOrigin: number;
		tempText: string;
		feels_likeOrigin: number;
		feels_likeText: string;
		humidity: number;
		weatherDescription: string;
		windSpeed: number;
		img: {
			urlImg: string;
			urlImgShort: string;
		};
	};
	location: string;
};
