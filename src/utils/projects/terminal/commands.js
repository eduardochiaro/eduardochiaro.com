import axios from 'axios';

const getWeather = async (city) => {
  try {
    const { data } = await axios.get(`https://wttr.in/${city}?ATnq0`);
    return data;
  } catch (error) {
    return error.toString();
  }
};

export const about = () => {
  return 'This is a personal website built with Next.js and TailwindCSS.'
}

export const weather = (args) => {
  if (args == '' || args.length <= 0) {
    return 'Please add the name of a city to the command, like "weather New York".';
  } else {
    const city = args.join('+');
    return getWeather(city);
  }
}

export const logo = () => {
  return `
                          @@@@*         
                    @@@@@@@@@@@@@@      
                @@@@@@@@@@@@            
              @@@@@@@@                  
       @      @@@@   .@@     @@@@       
       @@@.        @@@@@@@@  @@@@@&     
      &@@@@@@      @@@@@@@@  @@@@@@     
        @@@@@@@@    @@@@@@   @@@@@      
           @@@@@@@@@         @@@@@      
              %@@@@@@@@@@    @@@@@      
                   @@@      @@@@@       
                           @@@@@@       
                          @@@`;
}

export const fetch = () => {
  return (
    <div className="ml-6 mt-6">
      <div className="border-b border-dashed  w-1/3 mb-2">
        user@terminal.eduardochiaro.com
      </div>
      <div className="flex w-1/3">
        <span className="grow text-right">OS</span>
        <span className="mr-2">:</span>
        <span className="text-zinc-100 w-2/3">FakeOS 5.0</span>
      </div>
      <div className="flex w-1/3">
        <span className="grow text-right">Host</span>
        <span className="mr-2">:</span>
        <span className="text-zinc-100 w-2/3">eduardochiaro.com</span>
      </div>
      <div className="flex w-1/3">
        <span className="grow text-right">Kernel</span>
        <span className="mr-2">:</span>
        <span className="text-zinc-100 w-2/3">5.0.0</span>
      </div>
      <div className="flex w-1/3">
        <span className="grow text-right">Shell</span>
        <span className="mr-2">:</span>
        <span className="text-zinc-100 w-2/3">Terminal</span>
      </div>
      <div className="mt-4 mb-6">
        color scheme:
        <div className="flex gap-1">
          <span class="flex-none w-6 h-6 bg-primary-500 border border-primary-400"></span>
          <span class="flex-none w-6 h-6 bg-accent-500 border border-accent-400"></span>
          <span class="flex-none w-6 h-6 bg-red-500 border border-red-400"></span>
          <span class="flex-none w-6 h-6 bg-emerald-500 border border-emerald-400"></span>
          <span class="flex-none w-6 h-6 bg-blue-500 border border-blue-400"></span>
          <span class="flex-none w-6 h-6 bg-zinc-900 border border-zinc-700"></span>
          <span class="flex-none w-6 h-6 bg-zinc-100 border border-zinc-300"></span>
        </div>
      </div>
    </div>
  )
}