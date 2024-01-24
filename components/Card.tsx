import { Spinner } from './';
import cn from 'classnames';

interface CardProps {
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  color?: 'blue' | 'white';
  children?: React.ReactNode;
}

export function Card({
  className,
  children,
  loading,
  disabled,
  color = 'blue',
}: CardProps) {
  const rootClassName = cn(
    'rounded-xl shadow relative', // Clases comunes para ambas opciones
    {
      'bg-white': color === 'white', // Condición para la opción 'white'
      'bg-ghost-blue-400': color === 'blue', // Condición para la opción 'blue'
    },
    className
  );

  return (
    <div className={rootClassName}>
      {disabled && (
        <div className='absolute top-0 left-0 w-full h-full z-50 backdrop-grayscale bg-white/50' />
      )}
      {loading && (
        <div className='absolute top-0 left-0 w-full h-full z-20 flex items-center justify-center bg-white/80'>
          <i className='pl-2 m-0 flex'>
            <Spinner size={'lg'} />
          </i>
        </div>
      )}

      <div>{children}</div>
    </div>
  );
}

export default Card;
