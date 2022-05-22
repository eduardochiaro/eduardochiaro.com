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
    <div className="ml-4 my-4">
      <div className="border-b border-dashed  w-1/3 mb-2">
        user@eduardochiaro.com
      </div>
      <div className="flex w-1/3">
        <span className="grow text-emerald-500">OS</span>
        <span className="mx-2 text-red-500">-&gt;</span>
        <span className="w-2/3">FakeOS 5.0</span>
      </div>
      <div className="flex w-1/3">
        <span className="grow text-emerald-500">Host</span>
        <span className="mx-2 text-red-500">-&gt;</span>
        <span className="w-2/3">eduardochiaro.com</span>
      </div>
      <div className="flex w-1/3">
        <span className="grow text-emerald-500">Kernel</span>
        <span className="mx-2 text-red-500">-&gt;</span>
        <span className="w-2/3">5.0.0</span>
      </div>
      <div className="flex w-1/3">
        <span className="grow text-emerald-500">Shell</span>
        <span className="mx-2 text-red-500">-&gt;</span>
        <span className="w-2/3">Terminal</span>
      </div>
      <div className="mt-4">
        color scheme:
        <div className="flex gap-1">
          <span className="flex-none w-6 h-6 bg-primary-500 border border-primary-500"></span>
          <span className="flex-none w-6 h-6 bg-accent-500 border border-accent-500"></span>
          <span className="flex-none w-6 h-6 bg-red-500 border border-red-500"></span>
          <span className="flex-none w-6 h-6 bg-emerald-500 border border-emerald-500"></span>
          <span className="flex-none w-6 h-6 bg-blue-500 border border-blue-500"></span>
          <span className="flex-none w-6 h-6 bg-zinc-900 border border-zinc-700"></span>
          <span className="flex-none w-6 h-6 bg-zinc-100 border border-zinc-300"></span>
        </div>
      </div>
    </div>
  )
}