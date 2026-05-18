'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'

import {
  Cpu,
  Thermometer,
  Droplets,
  Gauge,
  CloudRain,
  Flame,
  Activity,
  Battery,
} from 'lucide-react'

export default function DashboardPage() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/devices')
      .then((res) => {
        setData(res.data)
      })
      .catch(console.error)
  }, [])

  if (!data) {
    return (
      <main className="min-h-screen bg-black text-white p-10">
        Loading telemetry...
      </main>
    )
  }

  const device = data.devices[0]
  const telemetry = data.telemetry

  const cards = [
    {
      title: 'Temperature',
      value: `${telemetry.temperature} °C`,
      icon: Thermometer,
      color: 'text-red-400',
    },
    {
      title: 'Humidity',
      value: `${telemetry.humidity}%`,
      icon: Droplets,
      color: 'text-blue-400',
    },
    {
      title: 'Pressure',
      value: `${telemetry.pressure} hPa`,
      icon: Gauge,
      color: 'text-yellow-400',
    },
    {
      title: 'Rain',
      value: `${telemetry.rain} mm`,
      icon: CloudRain,
      color: 'text-cyan-400',
    },
    {
      title: 'Gas Detection',
      value: telemetry.gasDetected
        ? 'Detected'
        : 'Safe',

      icon: Flame,

      color: telemetry.gasDetected
        ? 'text-red-500'
        : 'text-green-400',
    },
    {
      title: 'Motion',
      value: telemetry.motionDetected
        ? 'Active'
        : 'Inactive',

      icon: Activity,

      color: telemetry.motionDetected
        ? 'text-green-400'
        : 'text-zinc-400',
    },
    {
      title: 'Battery',
      value: `${telemetry.battery}%`,
      icon: Battery,
      color: 'text-green-400',
    },
  ]

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="flex items-center gap-4 mb-10">
        <Cpu size={40} className="text-green-400" />

        <div>
          <h1 className="text-4xl font-bold">
            IoT Nexus Dashboard
          </h1>

          <p className="text-zinc-400">
            {device.name}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  {card.title}
                </h2>

                <Icon
                  size={28}
                  className={card.color}
                />
              </div>

              <p className="text-3xl font-bold">
                {card.value}
              </p>
            </motion.div>
          )
        })}
      </div>
    </main>
  )
}
