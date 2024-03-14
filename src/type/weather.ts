export type Weather = {
    main: {
        temp: number,
        humidity: number,
        feels_like: number,
    },
    weather: [
        {
            id: number,
            description: string,
            icon: string
        }
    ],
    wind: {
        speed: number
    },
    dt_txt: string
}