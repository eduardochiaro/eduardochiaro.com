import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import SpinnerIcon from '@/components/icons/spinner';
import * as commands from '@/utils/projects/terminal/commands';
import classNames from '@/utils/classNames';

const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};
export default function Terminal() {
  const [historyIndex, setHistoryIndex] = useState(0);
  const [inputRef, setInputFocus] = useFocus();
  const [isLoading, setIsLoading] = useState(false);
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState([]);
  const [currentTime, setCurrentTime] = useState(moment().format('HH:mm'));

  const availableCommands = ['help', 'clear', ...Object.keys(commands)];

  const callAction = async (command, commandArgs) => {
    setHistoryIndex(0);
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
      default:
        const commandLine = command + (commandArgs.length > 0 ? ' ' + commandArgs.join(' ') : '');
        if (Object.keys(commands).indexOf(command) === -1) {
          const output = `shell: command not found: ${command}`;
          currentHistory.push({ ...commandFormat, command: commandLine, time, output });
        } else {
          const outputShell = await commands[command](commandArgs);
          currentHistory.push({ ...commandFormat, command: commandLine, time, output: outputShell });
        }
        break;
    }
    setIsLoading(false);
    setHistory(currentHistory);
  };

  const commandFormat = {
    command: '',
    output: '',
    time: '',
  };

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

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const index = historyIndex + 1;
      const findOldCommand = history[history.length - index]?.command;
      if (findOldCommand) {
        setHistoryIndex(index);
        setCommand(findOldCommand);
        setCurrentTime(moment().format('HH:mm'));
      }
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const index = historyIndex - 1;
      const findOldCommand = history[history.length - index]?.command;
      if (findOldCommand) {
        setHistoryIndex(index);
        setCommand(findOldCommand);
      } else {
        setHistoryIndex(0);
        setCommand('');
      }
      setCurrentTime(moment().format('HH:mm'));
    }
  };

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  const isACommand = (command) => {
    return availableCommands.includes(command.split(' ')[0]);
  };

  const Ps1Line = ({ time }) => (
    <div className="flex items-center gap-1">
      <span>
        [<span className="text-red-300">{time}</span>]
      </span>
      <span>
        <span className="text-blue-300">user</span>
        <span className="">::</span>
        <span className="text-emerald-300">~</span>
      </span>
      <span className="">$</span>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex-none h-6 rounded-t-lg bg-primary-300 flex items-center px-3 gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500 border border-red-600"></div>
        <div className="w-3 h-3 rounded-full bg-secondary-500 border border-secondary-600"></div>
        <div className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-600"></div>
      </div>
      <div className="bg-primary-900 text-primary-100 rounded-b-lg grow font-mono p-4 overflow-y-auto justify-end shadow-lg" onClick={setInputFocus}>
        {history.map((line, index) => (
          <div key={`history-${index}`} className="mb-1">
            <div className="flex flex-row space-x-2 items-center">
              <div className="flex-shrink">
                <Ps1Line time={line.time} />
              </div>
              <div className="flex-1 text-ellipsis overflow-hidden">
                <p>{line.command}</p>
              </div>
            </div>
            {line.output && <div className="whitespace-pre-wrap break-words text-secondary-100">{line.output}</div>}
          </div>
        ))}
        <div className="flex flex-row space-x-2 items-center">
          <div className="flex-shrink">
            <Ps1Line time={currentTime} />
          </div>
          <div className="flex-1 relative">
            <input
              autoFocus
              ref={inputRef}
              name="line"
              id="line-form"
              autoComplete="off"
              data-lpignore="true"
              data-form-type="other"
              className={classNames(
                'border-0 p-0 bg-transparent focus:outline-none w-full',
                !isACommand(command) && command != '' ? 'text-red-400' : 'text-emerald-500',
              )}
              onKeyDown={handleChange}
              onChange={(e) => setCommand(e.target.value)}
              value={command}
            />
            {isLoading && <SpinnerIcon className="h-5 animate-spin absolute top-0 right-0" />}
          </div>
        </div>
        <AlwaysScrollToBottom />
      </div>
    </div>
  );
}
