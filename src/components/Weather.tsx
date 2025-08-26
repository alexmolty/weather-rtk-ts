import {useAppSelector} from "../app/hooks.ts";

const Weather = () => {
    const weather = useAppSelector(state => state.weather);
    const message = useAppSelector(state => state.message);
    return (
        <div className={'infoWeath'}>
            {!message &&
                <>
                    <p>Location: {weather.country}, {weather.city}</p>
                    <p>Temp: {weather.temp} °C</p>
                    <p>Pressure: {weather.pressure} hPa</p>
                    <p>Sunset: {weather.sunset}</p>
                </>}
            {message}
        </div>
    )
};

export default Weather;