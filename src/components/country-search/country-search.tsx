import './country-search.scss';
import {throttle} from '../../helpers/helpers.ts';
import React, {MouseEvent, MutableRefObject, useEffect, useRef, useState} from 'react';
import {Location} from '../../type/location.ts';
import {requestLocation} from '../../helpers/request-api.ts';
import {SearchResultList} from '../search-result-list/search-result-list.tsx';
import {LoaderCountrySearch} from '../loader/loader.tsx';

let changeInput = () => {};
export const CountrySearch = ({
	fillDataWeather,
	endCountrySearch,
}: {
	fillDataWeather: (location: Location) => void;
	endCountrySearch: () => void;
}) => {
	const [cities, setCities] = useState<Array<Location>>([]);
	const inputRef: MutableRefObject<HTMLInputElement | undefined> = useRef();
	const [isLoader, setIsLoader] = useState<boolean>(false);

	function resultRequest() {
		let value = '';
		if (inputRef.current !== undefined) {
			value = inputRef.current.value;
		}
		if (value !== '') {
			setIsLoader(true);
			requestLocation(value)
				.then((request) => {
					if (request.isResponse) {
						setCities(request.locations);
					}
				})
				.finally(() => setIsLoader(false));
		} else {
			setCities([]);
		}
	}

	useEffect(() => {
		changeInput = throttle(resultRequest, 500);
	}, []);

	const downEscapeHandler = (ev: React.KeyboardEvent<HTMLInputElement>): void => {
		if (ev.key == 'Escape') {
			endCountrySearch();
		}
	};
	const mouseupCancelHandler = (ev: MouseEvent<HTMLDivElement>): void => {
		if (ev.currentTarget === ev.target) {
			endCountrySearch();
		}
	};

	const completeCountrySearch = (location: Location) => {
		endCountrySearch();
		fillDataWeather(location);
	};

	return (
		<div
			onClick={mouseupCancelHandler}
			role="button"
			className="country-search-container"
		>
			<div className="country-search">
				<input
					autoFocus
					className="country-search__text"
					ref={inputRef}
					onKeyDown={downEscapeHandler}
					onChange={() => changeInput()}
					type="text"
				/>
				{isLoader && <LoaderCountrySearch size={40} />}
				{cities.length != 0 && (
					<SearchResultList
						cities={cities}
						onCityClick={completeCountrySearch}
					/>
				)}
			</div>
		</div>
	);
};
