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