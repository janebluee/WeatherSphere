import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { WeatherData } from './types/weather';
import { useState } from 'react';

const queryClient = new QueryClient();

function WeatherApp() {
  const [city, setCity] = useState<string>('');

  const { data, isLoading, isError } = useQuery<WeatherData>({
    queryKey: ['weather', city],
    queryFn: async () => {
      if (!city) return null;
      const { data } = await axios.get(`http://localhost:5000/api/weather/${city}`);
      return data;
    },
    enabled: !!city,
  });

  return (
    <div className="relative min-h-screen h-screen w-screen overflow-hidden bg-[#0B1121]">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-[40%] left-[50%] w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-[45%] left-[45%] w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative h-full w-full flex flex-col p-8 lg:p-12 z-10">
        {/* Header Section */}
        <div className="text-center mb-6 lg:mb-8 animate-fade-in">
          <div className="relative inline-block">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2 font-sans tracking-tight
                         bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-100">
              Weather<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">Sphere</span>
            </h1>
            <div className="absolute -inset-1 blur-lg bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full"></div>
          </div>
          <p className="text-blue-200/80 text-base lg:text-lg font-light mt-2">
            Discover weather around the globe
          </p>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row gap-4 lg:gap-6 max-h-[calc(100vh-180px)]">
          {/* Left Side - Search and Info */}
          <div className="w-full lg:w-[40%] flex flex-col">
            <div className="backdrop-blur-2xl bg-white/5 rounded-2xl p-4 lg:p-6 shadow-2xl
                          border border-white/10 hover:border-white/20 transition-all duration-500
                          hover:shadow-blue-500/20">
              <div className="max-w-2xl mx-auto w-full">
                <SearchBar onSearch={setCity} />
                
                {!data && !isLoading && !isError && (
                  <div className="mt-8 lg:mt-12 text-center">
                    <div className="text-white/90 text-xl lg:text-2xl mb-8 font-light">
                      Enter a city name to get started
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {['London', 'Tokyo', 'New York'].map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => setCity(suggestion)}
                          className="group relative px-4 py-3 lg:px-6 lg:py-4 rounded-2xl 
                                   transition-all duration-500 overflow-hidden
                                   hover:scale-105 text-sm lg:text-base"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 
                                        group-hover:from-blue-500/30 group-hover:to-indigo-500/30 
                                        transition-all duration-500"></div>
                          <div className="absolute inset-0 backdrop-blur-xl bg-white/5 group-hover:bg-white/10"></div>
                          <span className="relative text-white/90 font-medium">{suggestion}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {isLoading && (
                  <div className="mt-12 text-center">
                    <div className="relative w-16 h-16 mx-auto">
                      <div className="absolute inset-0 rounded-full border-4 border-blue-500/30 animate-ping"></div>
                      <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-blue-400 animate-spin"></div>
                    </div>
                    <p className="text-blue-200/80 mt-6 text-lg">Fetching weather data...</p>
                  </div>
                )}
                
                {isError && (
                  <div className="mt-12 text-center">
                    <div className="p-6 bg-red-500/10 backdrop-blur-xl rounded-2xl border border-red-500/20">
                      <p className="text-red-200 text-lg">Error fetching weather data. Please try again.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Weather Display */}
          <div className="w-full lg:w-[60%] flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center">
              {data && <WeatherCard data={data} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherApp />
    </QueryClientProvider>
  );
}

export default App;
