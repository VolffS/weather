import {Location} from '../type/location.ts';

const key: string = '87df12757b92516754984c8be31f9a7a';
export async function requestNowWeather(lat: number | string, lon: number | string) {
	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=ru`,
	);

	if (response.ok) {
		return {
			weather: await response.json(),
			isResponse: true,
		};
	} else {
		return {
			isResponse: false,
		};
	}
}
export async function requestWeatherFiveDays(lat: number | string, lon: number | string) {
	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=ru`,
	);

	if (response.ok) {
		return {
			weather: await response.json(),
			isResponse: true,
		};
	} else {
		return {
			isResponse: false,
		};
	}
}
export async function requestLocation(
	location: string,
): Promise<{locations: Array<Location>; isResponse: boolean}> {
	const response = await fetch(
		`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${key}`,
	);

	if (response.ok) {
		const located = await response.json();
		const locations: Array<Location> = [];
		let name = '';
		for (const locatedElement of located) {
			for (const nameKey in locatedElement.local_names) {
				if (nameKey === 'ru') {
					name = locatedElement.local_names[nameKey];
					break;
				}
				name = '';
			}
			if (
				name !== '' &&
				locatedElement.state !== undefined &&
				locatedElement.country !== undefined
			) {
				locations.push({
					name: name,
					lat: locatedElement.lat,
					lon: locatedElement.lon,
					state: locatedElement.state,
					country: locatedElement.country,
				});
			}
		}
		return {
			locations: locations,
			isResponse: true,
		};
	} else {
		return {
			locations: [],
			isResponse: false,
		};
	}
}

export async function requestLocationRevers(
	lat: number,
	lon: number,
): Promise<{location: Location; isResponse: boolean}> {
	const response = await fetch(
		`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${key}`,
	);

	if (response.ok) {
		const located = await response.json();
		const locations: Location = {
			name: located[0].name,
			lat: located[0].lat,
			lon: located[0].lon,
			state: located[0].country,
			country: '',
		};

		return {
			location: locations,
			isResponse: true,
		};
	} else {
		return {
			location: {
				name: '',
				lat: lat,
				lon: lon,
				state: '',
				country: '',
			},
			isResponse: false,
		};
	}
}
