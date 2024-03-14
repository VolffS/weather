import './country-search.scss'
import {throttle} from '../../helpers/helpers.ts'
import {MutableRefObject, useEffect, useRef, useState} from "react";
import {Location} from "../../type/location.ts";
import {requestLocation} from "../../helpers/request-api.ts";
import {SearchResultList} from "../search-result-list/search-result-list.tsx";

let changeInput = () => {
};
export const CountrySearch = ({fillDataWeather, endCountrySearch}: {
    fillDataWeather: (location: Location) => void,
    endCountrySearch: () => void
}) => {

    const [cities, setCities] = useState<Array<Location>>([]);
    const inputRef: MutableRefObject<HTMLInputElement|undefined> = useRef();

    function resultRequest() {
        let value = "";
        if (inputRef.current !== undefined) {
            value = inputRef.current.value;
        }
        if (value !== "") {
            requestLocation(value).then(request => {
                if (request.isResponse) {
                    setCities(request.locations);
                }
            })
        } else {
            setCities([]);
        }
    }

    useEffect(() => {
        changeInput = throttle(resultRequest, 500);
    }, []);


    return (
        <div className="country-search-container">
            <div className="country-search">
                <input className="country-search__text" ref={inputRef} onChange={()=> changeInput()} type="text"/>
                {cities.length != 0 && <SearchResultList cities={cities} onDivClick={{fillDataWeather, endCountrySearch}}/>}
            </div>

        </div>
    );
}
