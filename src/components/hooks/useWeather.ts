import axios from "axios"
import {  z } from "zod"
// import { object, string, number, InferOutput, parse } from "valibot"
import { SeachType } from "../../types"
import { useMemo, useState } from "react"

//Type guard o type assertion 
// function isWeatherResponse(weather: unknown): weather is Weather {
//     return (
//         Boolean(weather) &&
//         typeof weather === "object" &&
//         typeof (weather as Weather).name === "string" &&
//         typeof (weather as Weather).main.temp === "number" &&
//         typeof (weather as Weather).main.temp_min === "number" &&
//         typeof (weather as Weather).main.temp_max === "number"
//     )
// }

//ZOD
const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp:z.number(),
        temp_min:z.number(),
        temp_max:z.number()
    })
})
export type Weather = z.infer<typeof Weather>

//Valibot
// const WeatherSchema = object({
//     name: string(),
//     main: object({
//         temp: number(),
//         temp_min: number(),
//         temp_max: number()
//     })
// })

// type Weather = InferOutput<typeof WeatherSchema>

const INITIAL_STATE = {
    name: "",
    main: {
        temp: 0,
        temp_min: 0,
        temp_max: 0
    }
}

export default function useWeather() {

    const [ weather, setWeather ] = useState<Weather>(INITIAL_STATE)

    const [ loading, setLoading ] = useState(false)

    const [ notfound , setNotFound ] = useState(false)

    const fetchWeather = async (search: SeachType) => {

        const appId = import.meta.env.VITE_API_KEY
        setLoading(true)
        setWeather(INITIAL_STATE)
        try {
            
            const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

            const { data }  = await axios.get(geoURL)
            
            //comprobar si hay datos
            if(!data[0]){
                setNotFound(true)
                console.log("No hay datos")
                return
            }

            const lat = data[0].lat
            const lon = data[0].lon

            const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`


            //Castear Type
            // const {data: weatherResults} = await axios<Weather>(weatherURL)
            // console.log(weatherResults)

            //Type guards
            // const {data: weatherResults} = await axios(weatherURL)
            // const result = isWeatherResponse(weatherResults)
            // if(result){
            //    console.log(weatherResults.main)
            // }

            //ZOD
            const {data: weatherResults} = await axios(weatherURL)
            const result = Weather.safeParse(weatherResults)
            if(result.success){
                setWeather(result.data)
            }

            //Valibot
            // const {data: weatherResults} = await axios(weatherURL)
            // const result = parse(WeatherSchema, weatherResults)
            // if(result){
            //     console.log(result.name)
            // } else {
            //     console.log("Error")
            // }


        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    const hasWeatherData = useMemo(() => weather.name, [weather])

    return {
        weather,
        loading,
        notfound,
        fetchWeather,
        hasWeatherData
        
    }
}