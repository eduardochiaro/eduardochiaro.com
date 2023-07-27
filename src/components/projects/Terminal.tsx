"use client";

import { KeyboardEvent, useEffect, useReducer, useRef } from 'react';
import moment from 'moment';
import SpinnerIcon from '@/components/icons/Spinner';
import * as commands from '@/utils/projects/terminal/commands';
import classNames from '@/utils/classNames';

const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    if (htmlElRef && htmlElRef.current) {
      const el = htmlElRef.current as HTMLInputElement;
      el.focus();
    }
  };
  return [htmlElRef, setFocus];
};

const initialState = {
  time: moment().format('HH:mm'),
  command: '',
  historyIndex: 0,
  history: [],
  isLoading: false,
};

function reducer(state: any, action: any) {
  return { ...state, ...action };
}

export default function Terminal() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputRef, setInputFocus] = useFocus();

  const availableCommands = ['help', 'clear', ...Object.keys(commands)];

  const callAction = async (command: string, commandArgs: string[]) => {
    dispatch({ historyIndex: 0 });
    let currentHistory = [...state.history];
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
          const outputShell = await commands[command as keyof typeof commands](commandArgs);
          currentHistory.push({ ...commandFormat, command: commandLine, time, output: outputShell });
        }
        break;
    }
    dispatch({ isLoading: false, history: currentHistory });
  };

  const commandFormat = {
    command: '',
    output: '',
    time: '',
  };

  const handleChange = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.code === '13') {
      e.preventDefault();
      const { value } = e.target as HTMLInputElement;
      const args = value.split(' ');
      const command = args[0].toLowerCase();
      const commandArgs = args.slice(1);

      dispatch({ isLoading: true });
      await callAction(command, commandArgs);
      dispatch({ time: moment().format('HH:mm'), command: '' });
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const index = state.historyIndex + 1;
      const findOldCommand = state.history[state.history.length - index]?.command;
      if (findOldCommand) {
        dispatch({ time: moment().format('HH:mm'), command: findOldCommand, historyIndex: index });
      }
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const index = state.historyIndex - 1;
      const findOldCommand = state.history[state.history.length - index]?.command;
      if (findOldCommand) {
        dispatch({ time: moment().format('HH:mm'), command: findOldCommand, historyIndex: index });
      } else {
        dispatch({ time: moment().format('HH:mm'), command: '', historyIndex: 0 });
      }
    }
  };

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef<null | HTMLDivElement>(null);
    useEffect(() => elementRef.current?.scrollIntoView());
    return <div ref={elementRef} />;
  };

  const isACommand = (command: string) => {
    return availableCommands.includes(command.split(' ')[0]);
  };

  const Ps1Line = ({ time }: { time: string }) => (
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
    <div className="flex flex-col h-[500px]">
      <div className="flex-none h-6 rounded-t-lg bg-primary-300 flex items-center px-3 gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500 border border-red-600"></div>
        <div className="w-3 h-3 rounded-full bg-secondary-500 border border-secondary-600"></div>
        <div className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-600"></div>
      </div>
      <div className="bg-primary-900 text-primary-100 rounded-b-lg grow font-mono p-4 overflow-y-auto justify-end shadow-lg" onClick={() => setInputFocus}>
        {state.history.map((line: any, index: number) => (
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
            <Ps1Line time={state.time} />
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
                'border-0 p-0 bg-transparent border-transparent focus:border-transparent focus:ring-0 w-full',
                !isACommand(state.command) && state.command != '' ? 'text-red-400' : 'text-emerald-500',
              )}
              onKeyDown={handleChange}
              onChange={(e) => dispatch({ command: e.target.value })}
              value={state.command}
            />
            {state.isLoading && <SpinnerIcon className="h-5 animate-spin absolute top-0 right-0" />}
          </div>
        </div>
        <AlwaysScrollToBottom />
      </div>
    </div>
  );
}
