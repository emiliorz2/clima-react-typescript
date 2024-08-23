export const formatTemp = (temp: number) => {
    const kelvin = 273.15
    return Math.round(temp - kelvin)
}