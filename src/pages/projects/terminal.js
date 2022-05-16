import Head from 'next/head';
import Header from "../../components/frontend/Header";
import Share from '../../components/frontend/Share';
import Footer from "../../components/frontend/Footer";
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import SpinnerIcon from '../../components/icons/spinner';

const getWeather = async (city) => {
  try {
    const { data } = await axios.get(`https://wttr.in/${city}?ATnq0`);
    return data;
  } catch (error) {
    return error.toString();
  }
};

const useFocus = () => {
  const htmlElRef = useRef(null)
  const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}

  return [ htmlElRef, setFocus ] 
}

function Terminal() {

  const [inputRef, setInputFocus] = useFocus();
  const [isLoading, setIsLoading] = useState(false);
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState([]);
  const [currentTime, setCurrentTime] = useState(moment().format('HH:mm'));

  const availableCommands = [
    'help',
    'clear',
    'about',
    'weather',
  ];

  const callAction = async (command, commandArgs) => {
    const currentHistory = [...history];
    const time = moment().format('HH:mm');
    switch (command) {
      case 'help':
        const outputHelp = 'Available commands: \n\n' + availableCommands.join(', ');
        currentHistory.push({ ...commandFormat, command, time, output: outputHelp });
        break;
      case 'clear':
        currentHistory = [];
        break;
      case '':
        currentHistory.push({ ...commandFormat, command, time, output: '' });
        break;
      case 'about':
        const outputAbout = 'This is a personal website built with Next.js and TailwindCSS.';
        currentHistory.push({ ...commandFormat, command, time, output: outputAbout });
        break;
      case 'weather':
        if (commandArgs == '') {
          const outputWeather = 'Please enter a city name.';
          currentHistory.push({ ...commandFormat, command, time, output: outputWeather });
        } else {
          const city = commandArgs.join('+');
          const outputWeather = await getWeather(city);
          currentHistory.push({ ...commandFormat, command: command + ' ' + commandArgs.join(' '), time, output: outputWeather });
        }
        break;
      default:
        const output = `shell: command not found: ${command}`;
        currentHistory.push({ ...commandFormat, command, time, output });
        break;
    }
    setIsLoading(false);
    setHistory(currentHistory);
  }

  const commandFormat = {
    command: '',
    output: '',
    time: '',
  }

  const handleChange = async (e) => {
    if (e.key === 'Enter' || e.code === '13') {
      e.preventDefault();
      const { value } = e.target;
      const args = value.split(' ');
      const command = args[0].toLowerCase();
      const commandArgs = args.slice(1);

      setIsLoading(true);
      await callAction(command, commandArgs);
      setCommand('');
      setCurrentTime(moment().format('HH:mm'));
    }
  }
  
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };
  
  const Ps1Line = ({time}) => (
    <div className="flex items-center gap-1">
      <span>[<span className="text-red-300">{time}</span>] </span>
      <span className="text-blue-300">user</span>
      <span className="">::</span>
      <span className="text-emerald-300">~ </span>
      <span className="">$ </span>
    </div>
  )
  return (
    <div className="flex flex-col h-screen justify-between">
      <Head>
        <title>Projects &gt; Terminal | Eduardo Chiaro</title>
      </Head>
      <div className="mb-auto">
        <Header />
        <Share />
        <section className={`px-4 lg:px-0 mt-10`}>
          <div className="max-w-5xl mx-auto">
            <h1 className="font-header leading-tight text-2xl lg:text-3xl font-light">
              <Link
                href="/projects"
                >
                <a className="hover:underline">Projects</a>
              </Link> &gt; Terminal
            </h1>
            <div className="mt-8">
              <div className="h-6 rounded-t-lg bg-zinc-300 flex items-center px-3 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              </div>
              <div className="bg-zinc-900 text-zinc-100 rounded-b-lg h-96 font-mono p-4 overflow-y-auto justify-end shadow-lg" onClick={setInputFocus} >
                { history.map((line, index) => (
                  <div key={`history-${index}`} className="mb-1">
                    <div className="flex flex-row space-x-2 items-center">
                      <div className="flex-shrink">
                        <Ps1Line time={line.time} />
                      </div>
                      <div className="flex-1 text-ellipsis overflow-hidden">
                        <p>{line.command}</p>
                      </div>
                    </div>
                    { line.output && (
                    <div className="whitespace-pre-wrap break-words text-primary-300">
                      {line.output}
                    </div>
                    )}
                  </div>
                ))}
                <div className="flex flex-row space-x-2 items-center">
                  <div className="flex-shrink">
                    <Ps1Line time={currentTime} />
                  </div>
                  <div className="flex-1 relative" >
                    <input 
                      autoFocus
                      ref={inputRef}
                      name="line"
                      id="line-form"
                      autoComplete="off"
                      data-lpignore="true" 
                      data-form-type="other"
                      className="border-0 p-0 bg-transparent focus:outline-none w-full"
                      onKeyPress={handleChange}
                      onChange={(e) => setCommand(e.target.value)}
                      value={command}
                    />
                    {isLoading && <SpinnerIcon className="h-5 animate-spin absolute top-0 right-0" />}
                  </div>
                </div>
                <AlwaysScrollToBottom />
            </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default Terminal;