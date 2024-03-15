export type WeatherRequest = {
	main: {
		//Оригинальная Температура
		temp: number;
		humidity: number;
		feels_like: number;
		// Температура для отображения. Высчитывается здесь
		tempText: number;
		// Температура для отображения. Высчитывается здесь
		feels_likeText: number;
	};
	weather: [
		{
			id: number;
			description: string;
			icon: string;
		},
	];
	wind: {
		speed: number;
	};
	// дата формата "0000-00-00"
	dt_txt: string;
};
