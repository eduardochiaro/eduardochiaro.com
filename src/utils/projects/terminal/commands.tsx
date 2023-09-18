import axios from 'axios';

const getWeather = async (city: string) => {
  try {
    const { data } = await axios.get(`https://wttr.in/${city}?ATnq0`);
    return data;
  } catch (error) {
    return error?.toString();
  }
};

export const about = () => {
  return 'This is a personal website built with Next.js and TailwindCSS.';
};

export const weather = (args: any[]) => {
  if (args.length <= 0) {
    return 'Please add the name of a city to the command, like "weather New York".';
  } else {
    const city = args.join('+');
    return getWeather(city);
  }
};

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
};

export const fetch = () => {
  return (
    <div className="my-4 ml-4">
      <div className="mb-2 w-1/3  border-b border-dashed">user@eduardochiaro.com</div>
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
          <span className="h-6 w-6 flex-none border border-secondary-500 bg-secondary-500"></span>
          <span className="h-6 w-6 flex-none border border-accent-500 bg-accent-500"></span>
          <span className="h-6 w-6 flex-none border border-red-500 bg-red-500"></span>
          <span className="h-6 w-6 flex-none border border-emerald-500 bg-emerald-500"></span>
          <span className="h-6 w-6 flex-none border border-blue-500 bg-blue-500"></span>
          <span className="h-6 w-6 flex-none border border-primary-700 bg-primary-900"></span>
          <span className="h-6 w-6 flex-none border border-primary-300 bg-primary-100"></span>
        </div>
      </div>
    </div>
  );
};
