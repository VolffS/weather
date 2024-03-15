import {TodayWeather} from '../type/today-weather.ts';
import {Weather} from '../type/weather.ts';
import {WeeksWeatherData} from '../type/weeks-weather-data.ts';
import {Location} from '../type/location.ts';

export enum Metric {
	fahrenheit = '°F',
	celsius = '°C',
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

export const formattingWeatherByDate = (
	currentWeather: {location: Location; weather: Weather},
	currentMetric: Metric,
): TodayWeather => {
	const forecast: Weather = currentWeather.weather;
	const date: string = new Date(forecast.dt_txt).toDateString();
	return {
		dayOfWeek: dayOfWeekFull(date.slice(0, 3)),
		fullDate: monthFull(date.slice(4, 7)) + date.slice(7),
		location: `${currentWeather.location.name}, ${currentWeather.location.state}`,
		urlImg: `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@4x.png`,
		temperature: `${Math.floor(forecast.main.temp)}${currentMetric}`,
		weatherDescription: `${forecast.weather[0].description}`,
	};
};
export const formattingWeeksWeatherData = (
	weatherInfo: Array<Weather>,
): Array<WeeksWeatherData> => {
	const dataWeek = [];
	for (const info of weatherInfo) {
		const date = new Date(info.dt_txt);
		const weather: WeeksWeatherData = {
			id: info.weather[0].id,
			dayOfWeek: dayOfWeekShort(date.toDateString().slice(0, 3)),
			temp: Math.floor(info.main.temp),
			urlImg: `https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`,
		};
		dataWeek.push(weather);
	}
	return dataWeek;
};

export const formattingCelsius = (num: number): number => {
	return (+num - 32) / 1.8;
};
export const formattingFahrenheit = (num: number): number => {
	return +num * 1.8 + 32;
};
