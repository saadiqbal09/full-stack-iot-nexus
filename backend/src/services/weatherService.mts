import axios from 'axios'

export async function fetchTelemetry() {
  const response = await axios.get(
    'https://api.open-meteo.com/v1/forecast?latitude=20.8648&longitude=77.7352&hourly=temperature_2m,rain,relative_humidity_2m,surface_pressure'
  )

  const hourly = response.data.hourly

  return {
    temperature:
      hourly.temperature_2m[0],

    humidity:
      hourly.relative_humidity_2m[0],

    pressure:
      hourly.surface_pressure[0],

    rain:
      hourly.rain[0],

    gasDetected:
      Math.random() > 0.8,

    motionDetected:
      Math.random() > 0.7,

    battery:
      Math.floor(Math.random() * 40) + 60,
  }
}
