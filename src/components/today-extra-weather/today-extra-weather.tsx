import './today-extra-weather.scss'
export function TodayExtraWeather() {
    return <div className="today-weather-container">
        <div className="today-info">
            <p className="today__title">Осадки</p>
            <p className="today__title-value">0 %</p>
        </div>
        <div className="today-info">
            <p className="today__title">Влажность</p>
            <p className="today__title-value">34 %</p>
        </div>
        <div className="today-info">
            <p className="today__title">Ветер</p>
            <p className="today__title-value">0 km/h</p>
        </div>
    </div>;
}