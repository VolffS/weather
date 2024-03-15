export type Weather = {
	main: {
		temp: number;
		humidity: number;
		feels_like: number;
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
