import { useState } from "react";
import backgroundVedio from "../src/assets/backgroundVedio/857027-hd-1920-1080-30fps_LtrfwlD6.mp4"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import axios from "axios";

export default function App() {
  const [data, setData] = useState({})
  const [city, setCity] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")


const url = `${import.meta.env.VITE_WEATHER_BASE_URL}?q=${city}&appid=${import.meta.env.VITE_WEATHER_KEY}`
  const searchCity = () => {
    setLoading(true) 
    setError("") // delete any error

    axios.get(url)
      .then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      .catch(() => {
        setError(" city not found ⚠️")
      })
    setLoading(false)
  }


  return (
    <div className="relative w-full h-screen overflow-hidden ">
      <video src={backgroundVedio} autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]" />
      <motion.div
        className="h-screen flex items-center justify-center text-white"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* content container  */}
        <div
          className="h-screen overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#4b5563_#00000080] scrollbar-thumb-gray-300 scrollbar-track-black/30 flex items-center justify-center 
      text-white"
        >
          <div className="text-center p-8 bg-black/30 rounded-2xl shadow-2xl w-[90%] sm:w-[400px]">
            <h1 className="text-4xl font-extrabold mb-6 mt-5 drop-shadow-lg">
              Weather App
            </h1>
            {error && (
              <p className="mt-4 text-red-400 font-bold">{error}</p>
            )}
            {/* weather details */}
            <div className="mb-6">
              <h2 className="text-3xl font-semibold">{!error&&(data.name)}</h2>
              <p className="text-5xl font-bold my-4"> {!error&&(data.main ? Math.round(data.main.temp - 273.15) : "")}°C</p>
              <p className="text-xl opacity-90">
                {!error&&(data.weather ? data.weather[0].description : "")}
              </p>

              {!error&&(data.weather && (
                <img
                  src={`${import.meta.env.VITE_WEATHER_BASE_URL_FOR_ICON}${data.weather[0].icon}${import.meta.env.VITE_WEATHER_IMAGE_EXTENSION}`}
                  alt={data.weather[0].description}
                  className="mx-auto"
                />
              ))}

            </div>

            {/* Enter  city container*/}
            <div className="flex items-center gap-2">

              <input
              className="w-27 md:w-60 lg:w-70"
                type="text"
                placeholder="Enter city..."
                name="city"
                value={city}
                onChange={(e) =>
                  setCity(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchCity();
                  }
                }}
              />

              <button
                onClick={() => {
                  searchCity()
                }}

                className="bg-amber-500  hover:bg-amber-600 px-4 py-2 rounded-lg font-bold transition"
              >
                {loading ? "Loading..." : "Search"}
              </button>

            </div>
            <div className="flex items-center">

              <div className="flex items-center justify-center w-48 sm:w-64 md:w-80 lg:w-96 max-w-full ">
                <video src="../src/assets/weatherIcon/weatherIconSuper_clean.webm" autoPlay
                  loop
                  muted
                  playsInline
                  className="w-48 h-30 object-contain bg-transparent"></video>
              </div></div>
          </div>
        </div></motion.div >
      ``
    </div >
  );
}
