const radiusMap = {
  sm: 'rounded-md',
  md: 'rounded-lg',
  lg: 'rounded-xl',
};

const sizeMap = {
  sm: { width: '180px', spineTranslation: '152px' },
  md: { width: '220px', spineTranslation: '192px' },
  lg: { width: '260px', spineTranslation: '232px' },
};

const colorMap = {
  primary: { from: 'from-primary-900', to: 'to-primary-700' },
  red: { from: 'from-red-900', to: 'to-red-700' },
  emerald: { from: 'from-emerald-900', to: 'to-emerald-700' },
};

interface BookProps {
  radius?: 'sm' | 'md' | 'lg';
  size?: 'sm' | 'md' | 'lg';
  color?: keyof typeof colorMap;
  isStatic?: boolean;
  className?: string;
  children: React.ReactNode;
  cover?: string;
}

const Book: React.FC<BookProps> = ({ radius = 'sm', size = 'md', color = 'primary', cover = '', isStatic = false, className = '', children }) => {
  const gradient = colorMap[color] || colorMap.primary;

  return (
    <div className={`group z-10 w-min [--shadowColor:#bbb] [perspective:800px] dark:[--shadowColor:#111] ${className}`}>
      <div
        style={{
          width: sizeMap[size].width,
          transition: 'transform 1000ms ease',
        }}
        className={`relative [transform-style:preserve-3d] ${
          isStatic ? '[transform:rotateY(-30deg)]' : '[transform:rotateY(0deg)] group-hover:[transform:rotateY(-30deg)]'
        } aspect-[2/3] ${radiusMap[radius]}`}
      >
        {/* Front Side */}
        <div
          className={`text-white ] ${radiusMap[radius]} absolute inset-y-0 left-0 flex size-full flex-col justify-end overflow-hidden bg-gradient-to-tr bg-cover bg-center bg-no-repeat p-6 ${gradient.from} ${gradient.to}`}
          style={{
            transform: 'translateZ(25px)',
            boxShadow: '5px 5px 20px var(--shadowColor)',
            backgroundImage: cover ? `url('${cover}')` : '',
            backgroundPosition: 'bottom center',
          }}
        >
          <div
            className="absolute left-0 top-0 h-full"
            style={{
              minWidth: '8.2%',
              background:
                'linear-gradient(90deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, 0) 12%, hsla(0, 0%, 100%, .25) 29.25%, hsla(0, 0%, 100%, 0) 50.5%, hsla(0, 0%, 100%, 0) 75.25%, hsla(0, 0%, 100%, .25) 91%, hsla(0, 0%, 100%, 0)), linear-gradient(90deg, rgba(0, 0, 0, .03), rgba(0, 0, 0, .1) 12%, transparent 30%, rgba(0, 0, 0, .02) 50%, rgba(0, 0, 0, .2) 73.5%, rgba(0, 0, 0, .5) 75.25%, rgba(0, 0, 0, .15) 85.25%, transparent)',
              opacity: 0.2,
            }}
          ></div>
          <div className="pl-1">{!cover && children}</div>
        </div>

        {/* Spine */}
        <div
          className="bg-white absolute left-0"
          style={{
            top: '3px',
            bottom: '3px',
            width: '48px',
            transform: `translateX(${sizeMap[size].spineTranslation}) rotateY(90deg)`,
            background: 'linear-gradient(90deg, rgba(255,255,255,1) 50%, rgba(249,249,249,1) 50%)',
          }}
        ></div>

        {/* Back Side */}
        <div
          className={`text-white absolute inset-y-0 left-0 flex size-full flex-col justify-end overflow-hidden bg-gradient-to-tr p-6 ${gradient.from} ${gradient.to} ${radiusMap[radius]}`}
          style={{
            transform: 'translateZ(-25px)',
            boxShadow: '-10px 0 50px 10px var(--shadowColor)',
          }}
        ></div>
      </div>
    </div>
  );
};

interface BookHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const BookHeader: React.FC<BookHeaderProps> = ({ children, className = '' }) => <div className={`flex flex-wrap gap-2 ${className}`}>{children}</div>;

interface BookTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const BookTitle: React.FC<BookTitleProps> = ({ children, className = '' }) => (
  <h1 className={`mb-1 mt-3 select-none text-balance font-bold ${className}`}>{children}</h1>
);

interface BookDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const BookDescription: React.FC<BookDescriptionProps> = ({ children, className = '' }) => (
  <p className={`select-none text-xs/relaxed opacity-80 ${className}`}>{children}</p>
);

export default Book;
