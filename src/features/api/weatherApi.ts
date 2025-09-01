import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {api_key, base_url} from "../../utils/constants.ts";
import type {WeatherInfo, WeatherInfoResponse} from "../../utils/types";

//How refetch weather info after user defined timeout
// 1. Самое простое: pollingInterval (реализован в Weather.tsx)
// 2. Полный контроль: создать setInterval в useEffect, и вызвать refetch() из хука.

// ** что-то сложное - не разобрался **
// 3. InvalidateTags по таймеру используя tagTypes:
// В createApi: добавить tagTypes: ['Weather']
// В getWeatherByCity: providesTags: [{ type: 'Weather', id: city }].
// В эффекте/таймере: dispatch(weatherApi.util.invalidateTags([{ type: 'Weather', id: city }])) с нужным интервалом.

export const weatherApi = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery({baseUrl: base_url}),
    refetchOnMountOrArgChange: 30,
// Если с момента последнего успешного запроса прошло меньше 30 секунд → отдаст данные из кэша и новый fetch НЕ пойдёт.
// Если прошло больше 30 секунд → сразу вернёт кэшированные данные (если они ещё не удалены по keepUnusedDataFor = 60), и ПАРАЛЛЕЛЬНО отправит новый запрос на сервер.
// Это полезно, когда нужно мгновенно показать что-то пользователю (без спиннера), но при этом гарантировать обновление данных, если кэш уже «протух».
    endpoints: builder => ({
       getWeatherByCity: builder.query<WeatherInfo, string>({
           query: city => `?q=${city}&appid=${api_key}&units=metric`,
           keepUnusedDataFor: 60, // держит кэш 60 секунд
           transformResponse: (data: WeatherInfoResponse) => ({
               city: data.name,
               temp: data.main.temp,
               pressure: data.main.pressure,
               country: data.sys.country,
               sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString()
           })
       })
    }),
})

export const {useGetWeatherByCityQuery} = weatherApi;
