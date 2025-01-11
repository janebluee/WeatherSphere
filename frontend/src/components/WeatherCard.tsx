import React from 'react';
import { WeatherData } from '../types/weather';

interface WeatherCardProps {
  data: WeatherData;
}

const getWeatherStyles = (icon: string) => {
  // Daytime icons
  if (icon.endsWith('d')) {
    switch (icon.slice(0, -1)) {
      case '01': // clear sky
        return {
          iconColor: 'from-yellow-300 to-amber-500',
          glowColor: 'from-yellow-500/30 to-amber-500/30',
          animation: 'animate-pulse'
        };
      case '02': // few clouds
      case '03': // scattered clouds
      case '04': // broken clouds
        return {
          iconColor: 'from-blue-300 to-blue-400',
          glowColor: 'from-blue-400/20 to-blue-500/20',
          animation: 'animate-float'
        };
      case '09': // shower rain
      case '10': // rain
        return {
          iconColor: 'from-blue-400 to-blue-600',
          glowColor: 'from-blue-500/30 to-blue-600/30',
          animation: 'animate-bounce-slow'
        };
      case '11': // thunderstorm
        return {
          iconColor: 'from-purple-400 to-purple-600',
          glowColor: 'from-purple-500/30 to-purple-600/30',
          animation: 'animate-flash'
        };
      case '13': // snow
        return {
          iconColor: 'from-blue-100 to-blue-200',
          glowColor: 'from-blue-200/30 to-blue-300/30',
          animation: 'animate-float'
        };
      case '50': // mist
        return {
          iconColor: 'from-gray-300 to-gray-400',
          glowColor: 'from-gray-400/20 to-gray-500/20',
          animation: 'animate-pulse'
        };
      default:
        return {
          iconColor: 'from-blue-200 to-blue-300',
          glowColor: 'from-blue-300/20 to-blue-400/20',
          animation: ''
        };
    }
  }
  // Nighttime icons
  else {
    switch (icon.slice(0, -1)) {
      case '01': // clear sky
        return {
          iconColor: 'from-blue-200 to-indigo-300',
          glowColor: 'from-blue-300/20 to-indigo-400/20',
          animation: 'animate-pulse-slow'
        };
      case '02': // few clouds
      case '03': // scattered clouds
      case '04': // broken clouds
        return {
          iconColor: 'from-blue-400 to-indigo-500',
          glowColor: 'from-blue-500/20 to-indigo-600/20',
          animation: 'animate-float'
        };
      case '09': // shower rain
      case '10': // rain
        return {
          iconColor: 'from-blue-500 to-indigo-600',
          glowColor: 'from-blue-600/30 to-indigo-700/30',
          animation: 'animate-bounce-slow'
        };
      case '11': // thunderstorm
        return {
          iconColor: 'from-purple-500 to-indigo-600',
          glowColor: 'from-purple-600/30 to-indigo-700/30',
          animation: 'animate-flash'
        };
      case '13': // snow
        return {
          iconColor: 'from-blue-200 to-indigo-300',
          glowColor: 'from-blue-300/30 to-indigo-400/30',
          animation: 'animate-float'
        };
      case '50': // mist
        return {
          iconColor: 'from-gray-400 to-gray-500',
          glowColor: 'from-gray-500/20 to-gray-600/20',
          animation: 'animate-pulse'
        };
      default:
        return {
          iconColor: 'from-blue-300 to-indigo-400',
          glowColor: 'from-blue-400/20 to-indigo-500/20',
          animation: ''
        };
    }
  }
};

export const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const weatherStyles = getWeatherStyles(data.weather[0].icon);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full transform transition-all duration-500 hover:scale-[1.01]">
        <div className="relative overflow-hidden backdrop-blur-2xl bg-white/5 rounded-2xl p-4 lg:p-6 
                      shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-500
                      hover:shadow-blue-500/20 group">
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 
                        group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 
                        transition-all duration-700 animate-gradient"></div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold bg-clip-text text-transparent 
                             bg-gradient-to-r from-blue-200 to-indigo-100 mb-1">{data.name}</h2>
                <p className="text-blue-200/80 text-sm lg:text-base capitalize">{data.weather[0].description}</p>
              </div>
              <div className="relative group/icon">
                {/* Icon Glow Effect */}
                <div className={`absolute inset-0 rounded-full blur-2xl opacity-50 
                               bg-gradient-to-r ${weatherStyles.glowColor} 
                               group-hover/icon:opacity-70 transition-all duration-500 
                               ${weatherStyles.animation}`}></div>
                
                {/* Weather Icon with Color Overlay */}
                <div className={`relative z-10 w-16 lg:w-20 h-16 lg:h-20 
                                transform transition-transform duration-500 
                                group-hover/icon:scale-110 ${weatherStyles.animation}`}>
                  <img
                    src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
                    alt={data.weather[0].description}
                    className={`w-full h-full object-cover drop-shadow-2xl 
                              [filter:drop-shadow(0_0_10px_rgba(255,255,255,0.3))]
                              ${data.weather[0].icon.includes('d') ? '[filter:drop-shadow(0_0_8px_rgba(255,200,50,0.5))]' : ''}`}
                    style={{
                      filter: data.weather[0].icon.includes('d') ? 
                        'brightness(1.2) contrast(1.1) saturate(1.3)' : 
                        'brightness(1.1) contrast(1.05) saturate(1.1)'
                    }}
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-3 lg:mt-4">
              <div className="flex items-start">
                <div className="relative">
                  <div className="text-4xl lg:text-5xl font-bold bg-clip-text text-transparent 
                                bg-gradient-to-r from-blue-200 to-indigo-100 tracking-tighter">
                    {Math.round(data.main.temp)}°
                  </div>
                  <div className="absolute -inset-4 blur-2xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 
                                rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="text-lg lg:text-xl text-blue-200/80 mt-1 ml-1">C</div>
              </div>
              
              <div className="mt-4 lg:mt-6 grid grid-cols-2 gap-2 lg:gap-3">
                {[
                  { label: 'Feels Like', value: `${Math.round(data.main.feels_like)}°C` },
                  { label: 'Humidity', value: `${data.main.humidity}%` },
                  { label: 'Wind Speed', value: `${data.wind.speed} m/s` },
                  { label: 'Pressure', value: `${data.main.pressure} hPa` }
                ].map((item, index) => (
                  <div key={index} 
                       className="group/card relative overflow-hidden rounded-xl transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 
                                  group-hover/card:from-blue-500/20 group-hover/card:via-purple-500/20 group-hover/card:to-pink-500/20 
                                  transition-all duration-500"></div>
                    <div className="relative backdrop-blur-xl bg-white/5 p-2 lg:p-3 rounded-xl
                                  group-hover/card:bg-white/10 transition-all duration-500
                                  border border-white/10 group-hover/card:border-white/20">
                      <p className="text-blue-200/60 text-xs mb-0.5 font-medium">{item.label}</p>
                      <p className="text-lg lg:text-xl font-semibold bg-clip-text text-transparent 
                                  bg-gradient-to-r from-blue-200 to-indigo-100">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
