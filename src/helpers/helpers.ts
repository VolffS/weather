import {WeatherRequest} from '../type/weatherRequest.ts';
import {Location} from '../type/location.ts';
import {WeatherData} from '../type/weather-data.ts';

export enum TemperatureMetric {
	fahrenheit = '°F',
	celsius = '°C',
	kelvin = '°K',
}

export function throttle(func: Function, ms: number) {
	let isThrottled: boolean = false;
	let savedArgs: any, savedThis: any;

	function wrapper(this: any): void {
		if (isThrottled) {
			savedArgs = arguments;
			savedThis = this;
			return;
		}
		func.apply(this, arguments);
		isThrottled = true;

		setTimeout(() => {
			isThrottled = false;
			if (savedArgs) {
				wrapper.apply(savedThis, savedArgs);
				savedArgs = savedThis = null;
			}
		}, ms);
	}

	return wrapper;
}

export const dayOfWeekFull = (text: string): string => {
	switch (text) {
		case 'Mon':
			return 'Понедельник';
		case 'Tue':
			return 'Вторник';
		case 'Wed':
			return 'Среда';
		case 'Thu':
			return 'Четверг';
		case 'Fri':
			return 'Пятница';
		case 'Sat':
			return 'Суббота';
		case 'Sun':
			return 'Воскресенье';

		default:
			return 'Погоды нет';
	}
};
export const dayOfWeekShort = (text: string): string => {
	switch (text) {
		case 'Mon':
			return 'Пн';
		case 'Tue':
			return 'Вт';
		case 'Wed':
			return 'Ср';
		case 'Thu':
			return 'Чт';
		case 'Fri':
			return 'Пт';
		case 'Sat':
			return 'Сб ';
		case 'Sun':
			return 'Вс';

		default:
			return '';
	}
};

export const monthFull = (text: string): string => {
	switch (text) {
		case 'Jan':
			return 'Январь';
		case 'Feb':
			return 'Февраль';
		case 'Mar':
			return 'Март';
		case 'Apr':
			return 'Апрель';
		case 'May':
			return 'Май';
		case 'June':
			return 'Июнь';
		case 'July':
			return 'Июль';
		case 'Aug':
			return 'Август';
		case 'Sept':
			return 'Сентябрь';
		case 'Oct':
			return 'Октябрь';
		case 'Nov':
			return 'Ноябрь';
		case 'Dec':
			return 'Декабрь';
		default:
			return '';
	}
};
export const formattingWeeksWeatherData = (
	Weathers: {location: Location; weathers: Array<WeatherRequest>},
	metric: TemperatureMetric,
): Array<WeatherData> => {
	const dataWeek = [];
	const located = Weathers.location;
	for (const forecast of Weathers.weathers) {
		const date: string = new Date(forecast.dt_txt).toDateString();
		const weather = {
			id: forecast.weather[0].id,
			date: {
				dayOfWeek: dayOfWeekFull(date.slice(0, 3)),
				dayOfWeekShort: dayOfWeekShort(date.slice(0, 3)),
				fullDate: monthFull(date.slice(4, 7)) + date.slice(7),
			},
			weather: {
				tempOrigin: forecast.main.temp,
				tempText: `${conversionTemp(forecast.main.temp, metric)}${metric}`,
				feels_likeOrigin: forecast.main.feels_like,
				feels_likeText: `${conversionTemp(forecast.main.feels_like, metric)}${metric}`,
				humidity: forecast.main.humidity,
				weatherDescription: `${forecast.weather[0].description}`,
				windSpeed: forecast.wind.speed,
				img: {
					urlImg: `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@4x.png`,
					urlImgShort: `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`,
				},
			},
			location: `${located.name}, ${located.state}`,
		};
		dataWeek.push(weather);
	}
	return dataWeek;
};

export const conversionTemp = (num: number, metric: TemperatureMetric):number => {
	if (metric === TemperatureMetric.celsius) {
		return formattingCelsius(num);
	} else if (metric === TemperatureMetric.fahrenheit) {
		return formattingFahrenheit(num);
	} else {
		return formattingKelvin(num);
	}
};

export const formattingCelsius = (num: number): number => {
	return Math.floor((+num - 32) / 1.8);
};
export const formattingFahrenheit = (num: number): number => {
	return Math.floor(+num * 1.8 + 32);
};

export const formattingKelvin = (num: number): number => {
	return Math.floor(+num + 273.15);
};
