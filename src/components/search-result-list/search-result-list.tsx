import {Location} from "../../type/location.ts";
import './search-result-list.scss'
export const SearchResultList = ({cities, onDivClick}: {
    cities: Array<Location>,
    onDivClick: { fillDataWeather: (location: Location) => void, endCountrySearch: () => void }
}) => {
    return (
        <ul className="country-search__result">
            {cities.map((value: Location) =>
                    <li key={value.lon + value.lat}
                className="result-text">
                <button className="result-btn" onClick={() => {
        onDivClick.endCountrySearch();
        onDivClick.fillDataWeather(value);
    }}>
    {value.name}: {value.state}: {value.country}
    </button>
    </li>
)}
    </ul>
);
}