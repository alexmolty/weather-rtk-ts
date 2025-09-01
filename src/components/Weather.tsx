import {useAppSelector} from "../app/hooks.ts";
import {useGetWeatherByCityQuery} from "../features/api/weatherApi.ts";

const Weather = () => {
    const city = useAppSelector(state => state.city);
    const {data, error, isLoading} = useGetWeatherByCityQuery(city, {
        pollingInterval: 3000,
        skipPollingIfUnfocused: true,
    });
    if(!city) {
        return <div className={'infoWeath'}>Enter city name</div>
    }
    if (isLoading) {
        return <div className={'infoWeath'}>Loading...</div>
    }
    if (error) {
        return <div className={'infoWeath'}>Enter correct city name.</div>
    }
    return (
        <div className={'infoWeath'}>
            {!!data &&
                <>
                    <p>Location: {data.country}, {data.city}</p>
                    <p>Temp: {data.temp} °C</p>
                    <p>Pressure: {data.pressure} hPa</p>
                    <p>Sunset: {data.sunset}</p>
                </>}
        </div>
    )
};

export default Weather;