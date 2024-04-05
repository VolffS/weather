import {Location} from '../../type/location.ts';
import './search-result-list.scss';

export const SearchResultList = ({
	cities,
	onCityClick,
}: {
	cities: Array<Location>;
	onCityClick: (location: Location) => void;
}) => {
	return (
		<ul className="country-search__result">
			{cities.map((value: Location) => (
				<li
					key={value.lon + value.lat}
					className="result-text"
				>
					<button
						className="result-btn"
						onClick={() => {
							onCityClick(value);
						}}
					>
						{value.name}: {value.state}: {value.country}
					</button>
				</li>
			))}
		</ul>
	);
};
