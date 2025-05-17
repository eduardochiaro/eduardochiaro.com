import classNames from '@/utils/classNames';
import moment from 'moment';
import Image from 'next/image';
import WireContainer from '../frontend/WireContainer';
import Card from '../frontend/Card';

type TileType = {
  episode: any;
  maxCharacters?: number;
  type?: 'small' | 'large';
};

export const EvenTile = ({ episode, maxCharacters = 6, type = 'small' }: TileType) => (
  <div className="group flex">
    <div className={classNames(type == 'small' ? 'flex-1' : 'w-12 flex-none', 'hidden text-right font-mono md:block md:w-24')}>
      <span className="block text-xl md:text-3xl">{moment(episode.air_date, 'MMM DD, YYYY').format('DD')}</span>
      <span className="md:text-normal text-sm">{moment(episode.air_date, 'MMM DD, YYYY').format("MMM 'YY")}</span>
    </div>
    <div className="relative mx-2 hidden w-4 flex-none md:mx-4 md:block md:w-8">
      <div className="from-secondary-500 to-accent-500 z-10 mx-auto h-full w-0.5 bg-gradient-to-b group-first:mt-3 group-last:h-2 group-odd:bg-gradient-to-t"></div>
      <span className="border-primary-800 bg-primary-200 absolute top-2 left-1/2 z-20 h-4 w-4 -translate-x-1/2 transform rounded-full border-2 group-first:h-6 group-first:w-6 group-first:bg-emerald-500 group-last:h-6 group-last:w-6 group-last:bg-red-500"></span>
    </div>
    <div className="flex-1 pb-16">
      <WireContainer type="medium">
        <Card>
          <h3 className="font-header text-xl break-words md:text-3xl">{episode.name}</h3>
          <p className="font-mono">{episode.episode}</p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {episode.characters.slice(0, maxCharacters).map((y: any, index: number) => (
              <div key={`character-${index}`} className="flex items-center">
                <div className="relative hidden pr-4 md:block">
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
        </Card>
      </WireContainer>
    </div>
  </div>
);

export const OddTile = ({ episode, maxCharacters = 6, type = 'small' }: TileType) => (
  <div className="group flex">
    <div className="flex-1 pb-16">
      <WireContainer type="medium">
        <Card className="text-right">
          <h3 className="font-header text-xl break-words md:text-3xl">{episode.name}</h3>
          <p className="font-mono">{episode.episode}</p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {episode.characters.slice(0, maxCharacters).map((y: any, index: number) => (
              <div key={`character-${index}`} className="flex flex-row-reverse items-center">
                <div className="relative hidden pl-4 md:block">
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
                <p className="text-right text-xs">and {episode.characters_count - maxCharacters} more characters</p>
              </div>
            )}
          </div>
        </Card>
      </WireContainer>
    </div>
    <div className="relative mx-2 hidden w-4 flex-none md:mx-4 md:block md:w-8">
      <div className="from-secondary-500 to-accent-500 z-10 mx-auto h-full w-0.5 bg-gradient-to-b group-first:mt-3 group-last:h-2 group-odd:bg-gradient-to-t"></div>
      <span className="border-primary-800 bg-primary-200 absolute top-2 left-1/2 z-20 h-4 w-4 -translate-x-1/2 transform rounded-full border-2 group-first:h-6 group-first:w-6 group-first:bg-emerald-500 group-last:h-6 group-last:w-6 group-last:bg-red-500"></span>
    </div>
    <div className={classNames(type == 'small' ? 'flex-1' : 'w-12 flex-none', 'hidden font-mono md:block md:w-24')}>
      <span className="block text-xl md:text-3xl">{moment(episode.air_date, 'MMM DD, YYYY').format('DD')}</span>
      <span className="md:text-normal text-sm">{moment(episode.air_date, 'MMM DD, YYYY').format("MMM 'YY")}</span>
    </div>
  </div>
);
