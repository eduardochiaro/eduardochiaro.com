import classNames from '@/utils/classNames';
import moment from 'moment';
import Image from 'next/image';

type TileType = {
  episode: any;
  maxCharacters?: number;
  type?: 'small' | 'large';
};

export const EvenTile = ({ episode, maxCharacters = 6, type = 'small' }: TileType) => (
  <div className="flex group">
    <div className={classNames(type == 'small' ? 'flex-1' : 'flex-none w-12', 'hidden md:block md:w-24 font-mono text-right')}>
      <span className="text-xl md:text-3xl block">{moment(episode.air_date, 'MMM DD, YYYY').format('DD')}</span>
      <span className="text-sm md:text-normal">{moment(episode.air_date, 'MMM DD, YYYY').format("MMM 'YY")}</span>
    </div>
    <div className="hidden md:block flex-none w-4 md:w-8 relative mx-2 md:mx-4">
      <div className="mx-auto w-0.5 h-full bg-gradient-to-b group-odd:bg-gradient-to-t from-secondary-500 to-accent-500 group-last:h-2 group-first:mt-3 z-10"></div>
      <span className="absolute top-2 left-1/2 transform -translate-x-1/2 rounded-full w-4 h-4 bg-primary-200 border-2 border-primary-800 z-20 group-first:bg-emerald-500 group-last:bg-red-500 group-last:w-6 group-last:h-6 group-first:w-6 group-first:h-6"></span>
    </div>
    <div className="pb-16 flex-1">
      <div className="box-card p-4">
        <h3 className="text-xl md:text-3xl font-header break-words">{episode.name}</h3>
        <p className="font-mono">{episode.episode}</p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {episode.characters.slice(0, maxCharacters).map((y: any, index: number) => (
            <div key={`character-${index}`} className="flex items-center">
              <div className="hidden md:block relative pr-4">
                <Image width={50} height={50} alt={y.name} src={y.image} className="rounded-full" />
              </div>
              <div>
                <h4 className="text-sm">{y.name}</h4>
                <p className="text-xs">{y.species}</p>
              </div>
            </div>
          ))}
          {episode.characters_count > maxCharacters && (
            <div className="col-span-2">
              <p className="text-xs">and {episode.characters_count - maxCharacters} more characters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

export const OddTile = ({ episode, maxCharacters = 6, type = 'small' }: TileType) => (
  <div className="flex group">
    <div className="pb-16 flex-1">
      <div className="box-card p-4 text-right">
        <h3 className="text-xl md:text-3xl font-header break-words">{episode.name}</h3>
        <p className="font-mono">{episode.episode}</p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {episode.characters.slice(0, maxCharacters).map((y: any, index: number) => (
            <div key={`character-${index}`} className="flex items-center flex-row-reverse">
              <div className="hidden md:block relative pl-4">
                <Image width={50} height={50} alt={y.name} src={y.image} className="rounded-full" />
              </div>
              <div>
                <h4 className="text-sm">{y.name}</h4>
                <p className="text-xs">{y.species}</p>
              </div>
            </div>
          ))}
          {episode.characters_count > maxCharacters && (
            <div className="col-span-2">
              <p className="text-xs text-right">and {episode.characters_count - maxCharacters} more characters</p>
            </div>
          )}
        </div>
      </div>
    </div>
    <div className="hidden md:block flex-none w-4 md:w-8 relative mx-2 md:mx-4">
      <div className="mx-auto w-0.5 h-full bg-gradient-to-b group-odd:bg-gradient-to-t from-secondary-500 to-accent-500 group-last:h-2 group-first:mt-3 z-10"></div>
      <span className="absolute top-2 left-1/2 transform -translate-x-1/2  rounded-full w-4 h-4 bg-primary-200 border-2 border-primary-800 z-20 group-first:bg-emerald-500 group-last:bg-red-500 group-last:w-6 group-last:h-6 group-first:w-6 group-first:h-6"></span>
    </div>
    <div className={classNames(type == 'small' ? 'flex-1' : 'flex-none w-12', 'hidden md:block md:w-24 font-mono')}>
      <span className="text-xl md:text-3xl block">{moment(episode.air_date, 'MMM DD, YYYY').format('DD')}</span>
      <span className="text-sm md:text-normal">{moment(episode.air_date, 'MMM DD, YYYY').format("MMM 'YY")}</span>
    </div>
  </div>
);
