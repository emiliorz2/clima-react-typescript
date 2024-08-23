import { formatTemp } from "../../utils"
import { Weather } from "../hooks/useWeather"
import styles from './WeatherDetail.module.css'

type WeatherDetailProps = {
    weather: Weather
}

export const WeatherDetail = ({ weather }: WeatherDetailProps) => {
    return (
        <div className={styles.container}>
            <h2>Clima de: {weather.name}</h2>
            <p className={styles.current}>Temperatura: {formatTemp(weather.main.temp)}°C</p>
            <div className={styles.temperatures}>
                <p>Temperatura minima: <span>{formatTemp(weather.main.temp_min)}°C</span></p>
                <p>Temperatura maxima: <span>{formatTemp(weather.main.temp_max)}°C</span></p>
            </div>
        </div>
    )
}
