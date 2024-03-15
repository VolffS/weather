import './main-content.scss';
import {SideInformation} from '../side-information/side-information.tsx';
import {CurrentWeather} from '../current-weather/current-weather.tsx';
import {useEffect, useMemo, useRef, useState} from 'react';
import {CountrySearch} from '../country-search/country-search.tsx';
import {Location} from '../../type/location.ts';
import {requestLocationRevers} from '../../helpers/request-api.ts';
import {Coordinate} from '../../type/coordinate.ts';
import {Geolocation} from '../../type/geolocation.ts';
import {TemperatureMetric} from '../../helpers/helpers.ts';
import {useWeather} from '../../hooks/useWeather.ts';
import {WeatherContextData} from '../../hooks/weather-context-data.ts';
import {Loader} from '../loader/loader.tsx';
import {WeatherState} from '../../type/weatherState.ts';

export const MainContent = () => {
	const WeatherForecast: WeatherState = useWeather();
	const [isCountrySearch, setIsCountrySearch] = useState<boolean>(false);
	const [activeDay, setActiveDay] = useState<number>(0);
	const [temperatureMetric, setTemperatureMetric] = useState<TemperatureMetric>(
		TemperatureMetric.celsius,
	);
	const loaderRef = useRef();

	if (loaderRef.current !== undefined && !WeatherForecast.isLoad) {
		loaderRef.current.classList.add('disabled-loader');
	} else if (loaderRef.current !== undefined) {
		loaderRef.current.classList.remove('disabled-loader');
	}

	function fillDataWeather(location: Location): void {
		setActiveDay(0);
		WeatherForecast.refreshStateWeather(location, temperatureMetric);
	}

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(successGetCurrentPosition);
	}, []);

	function successGetCurrentPosition(pos: Geolocation): void {
		const crd: Coordinate = pos.coords;
		requestLocationRevers(crd.latitude, crd.longitude)
			.then((location) => {
				fillDataWeather(location.location);
			})
			.finally(() => loaderRef.current.classList.remove('disabled-loader'));
	}

	const changeIsCountrySearch = (): void => {
		setIsCountrySearch(!isCountrySearch);
	};

	const selectWeatherDay = (day: number): void => {
		activeDay === day ? setActiveDay(0) : setActiveDay(day);
	};
	const changeWeatherMetric = (metric: TemperatureMetric): void => {
		if (temperatureMetric !== metric) {
			WeatherForecast.changeWeatherMetric(metric);
			setTemperatureMetric(metric);
		}
	};

	const contextValue = useMemo(
		() => ({
			activeDay,
			temperatureMetric,
		}),
		[activeDay, temperatureMetric],
	);

	return (
		<main>
			<div className="main-container">
				<div className="select-metric">
					<button
						disabled={WeatherForecast.isLoad}
						onClick={() => {
							changeWeatherMetric(TemperatureMetric.celsius);
						}}
					>
						°C
					</button>
					<button
						disabled={WeatherForecast.isLoad}
						onClick={() => {
							changeWeatherMetric(TemperatureMetric.kelvin);
						}}
					>
						°K
					</button>
					<button
						disabled={WeatherForecast.isLoad}
						onClick={() => {
							changeWeatherMetric(TemperatureMetric.fahrenheit);
						}}
					>
						°F
					</button>
				</div>
				<div className="main-content">
					<WeatherContextData.Provider value={contextValue}>
						<CurrentWeather currentWeather={WeatherForecast.weatherData[activeDay]} />

						<SideInformation
							onCountrySearch={changeIsCountrySearch}
							selectWeatherDay={selectWeatherDay}
							weather={WeatherForecast.weatherData}
						/>
					</WeatherContextData.Provider>
				</div>
			</div>

			<div
				ref={loaderRef}
				className="loader-background disabled-loader"
			>
				<Loader size={80} />
			</div>

			{isCountrySearch && (
				<CountrySearch
					fillDataWeather={fillDataWeather}
					endCountrySearch={changeIsCountrySearch}
				/>
			)}
		</main>
	);
};
