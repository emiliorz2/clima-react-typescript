import axios from "axios"
import { SeachType } from "../../types"



export default function useWeather() {
    const fetchWeather = async (search: SeachType) => {

        const appId = import.meta.env.VITE_API_KEY
        try {
            
            const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

            const { data }  = await axios.get(geoURL)
            

            const lat = data[0].lat
            const lon = data[0].lon

            const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

            const {data: weatherResults} = await axios.get(weatherURL)

            console.log(weatherResults)


        } catch (error) {
            console.log(error)
        }
    }

    return {
        fetchWeather
    }
}