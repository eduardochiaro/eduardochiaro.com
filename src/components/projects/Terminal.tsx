'use client';

import { KeyboardEvent, useEffect, useReducer, useRef } from 'react';
import { format as dateFormat } from '@/utils/date';
import * as commands from '@/utils/projects/terminal/commands';
import classNames from '@/utils/classNames';
import WireContainer from '../frontend/WireContainer';
import SquareSpinner from '@/components/SquareSpinner';
import Card from '../frontend/Card';

const useFocus = (): [React.RefObject<HTMLInputElement | null>, () => void] => {
  const htmlElRef = useRef<HTMLInputElement | null>(null);
  const setFocus = () => {
    htmlElRef.current?.focus();
  };
  return [htmlElRef, setFocus];
};

const initialState = {
  time: dateFormat(new Date(), 'HH:mm'),
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
    const time = dateFormat(new Date(), 'HH:mm');
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
      dispatch({ time: dateFormat(new Date(), 'HH:mm'), command: '' });
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const index = state.historyIndex + 1;
      const findOldCommand = state.history[state.history.length - index]?.command;
      if (findOldCommand) {
        dispatch({ time: dateFormat(new Date(), 'HH:mm'), command: findOldCommand, historyIndex: index });
      }
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const index = state.historyIndex - 1;
      const findOldCommand = state.history[state.history.length - index]?.command;
      if (findOldCommand) {
        dispatch({ time: dateFormat(new Date(), 'HH:mm'), command: findOldCommand, historyIndex: index });
      } else {
        dispatch({ time: dateFormat(new Date(), 'HH:mm'), command: '', historyIndex: 0 });
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
    <WireContainer type="large">
      <Card className="flex h-[500px] flex-col !p-0">
        <div className="bg-primary-300 flex h-6 flex-none items-center gap-2 rounded-t-lg px-3">
          <div className="size-3 rounded-full border border-red-600 bg-red-500"></div>
          <div className="size-3 rounded-full border border-yellow-600 bg-yellow-500"></div>
          <div className="size-3 rounded-full border border-emerald-600 bg-emerald-500"></div>
        </div>
        <div className="bg-primary-950 text-primary-50 grow justify-end overflow-y-auto rounded-b-lg p-4 font-mono shadow-lg" onClick={() => setInputFocus()}>
          {state.history.map((line: any, index: number) => (
            <div key={`history-${index}`} className="mb-1">
              <div className="flex flex-row items-center space-x-2">
                <div className="flex-shrink">
                  <Ps1Line time={line.time} />
                </div>
                <div className="flex-1 overflow-hidden text-ellipsis">
                  <p>{line.command}</p>
                </div>
              </div>
              {line.output && <div className="text-secondary-100 break-words whitespace-pre-wrap">{line.output}</div>}
            </div>
          ))}
          <div className="flex flex-row items-center space-x-2">
            <div className="flex-shrink">
              <Ps1Line time={state.time} />
            </div>
            <div className="relative flex-1">
              <input
                autoFocus
                ref={inputRef}
                name="line"
                id="line-form"
                autoComplete="off"
                data-lpignore="true"
                data-form-type="other"
                className={classNames(
                  'w-full border-0 border-transparent bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-none',
                  !isACommand(state.command) && state.command != '' ? 'text-red-400' : 'text-emerald-500',
                )}
                onKeyDown={handleChange}
                onChange={(e) => dispatch({ command: e.target.value })}
                value={state.command}
              />
            </div>
          </div>
          {state.isLoading && <SquareSpinner />}
          <AlwaysScrollToBottom />
        </div>
      </Card>
    </WireContainer>
  );
}
