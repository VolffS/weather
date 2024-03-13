import './main-content.scss';
import {SideInformation} from "../side-information/side-information.tsx";
import {CurrentWeather} from "../current-weather/current-weather.tsx";

export const MainContent = () => {

    return (
        <main>
            <div className="main-content">
                <CurrentWeather />
                <SideInformation />
            </div>
        </main>
    );
}

