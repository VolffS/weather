import {TodayWeather} from "../type/today-weather.ts";
import {WeatherData} from "../type/weather-data.ts";
import {Weather} from "../type/weather.ts";
import {WeeksWeatherData} from "../type/weeks-weather-data.ts";


export function throttle(func, ms) {

    let isThrottled = false;
    let savedArgs;
    let savedThis;


    function wrapper() {

        if (isThrottled) { // (2)

            savedArgs = arguments;
            savedThis = this;
            return;
        }
        console.log(this)
        func.apply(this, arguments); // (1)

        isThrottled = true;

        setTimeout(function() {
            isThrottled = false; // (3)
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }

    return wrapper;
}

export const dayOfWeekFull = (text:string):string => {
    switch (text) {
        case "Mon":
            return "Понедельник";
        case "Tue":
            return "Вторник";
        case "Wed":
            return "Среда";
        case "Thu":
            return "Четверг";
        case "Fri":
            return "Пятница";
        case "Sat":
            return "Суббота";
        case "Sun":
            return "Воскресенье";

        default :
            return "Ничего";
    }
}
export const dayOfWeekShort = (text:string):string => {
    switch (text) {
        case "Mon":
            return "Пн";
        case "Tue":
            return "Вт";
        case "Wed":
            return "Ср";
        case "Thu":
            return "Чт";
        case "Fri":
            return "Пт";
        case "Sat":
            return "Сб ";
        case "Sun":
            return "Вс";

        default :
            return "Не найдено";
    }
}

export const monthFull = (text:string):string => {
    switch (text) {
        case "Jan":
            return "Январь";
        case "Feb":
            return "Февраль";
        case "Mar":
            return "Март";
        case "Apr":
            return "Апрель";
        case "May":
            return "Май";
        case "June":
            return "Июнь";
        case "July":
            return "Июль";
        case "Aug":
            return "Август";
        case "Sept":
            return "Сентябрь";
        case "Oct":
            return "Октябрь";
        case "Nov":
            return "Ноябрь";
        case "Dec":
            return "Декабрь";
        default :
            return "Не найдено";
    }
}


export const formattingTodayWeather = (currentWeather: WeatherData):TodayWeather => {
    const date: string = new Date(currentWeather.weathers[0].dt_txt).toDateString();
    return {
        dayOfWeek: dayOfWeekFull(date.slice(0,3)),
        fullDate: monthFull(date.slice(4,7)) + date.slice(7),
        location: `${currentWeather.location.name}, ${currentWeather.location.state}`,
        urlImg: `https://openweathermap.org/img/wn/${currentWeather.weathers[0].weather[0].icon}@4x.png`,
        temperature: `${Math.floor(currentWeather.weathers[0].main.temp)}°C`,
        weatherDescription: `${currentWeather.weathers[0].weather[0].description}`,
    }
}
export const formattingWeeksWeatherData = (weatherInfo: Array<Weather>): Array<WeeksWeatherData>  => {
    const dataWeek = []
    for (const info of weatherInfo) {
        const date = new Date(info.dt_txt);
        const weather: WeeksWeatherData= {
            id: info.weather[0].id,
            dayOfWeek: dayOfWeekShort(date.toDateString().slice(0,3)),
            day: date.getDay(),
            urlImg: `https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`,
        };
        dataWeek.push(weather);
    }
    dataWeek.shift()
    return dataWeek
}