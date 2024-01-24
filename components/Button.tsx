// import styled from 'styled-components';
import { Spinner } from './';
import {
  ButtonHTMLAttributes,
  FC,
  JSXElementConstructor,
  forwardRef,
  useRef,
} from 'react';
import { mergeRefs } from 'react-merge-refs';
import cn from 'classnames';

type BDColors =
  | 'blue'
  | 'magenta'
  | 'primary'
  | 'lightGray'
  | 'ghostBlue'
  | 'black'
  | 'alert'
  | 'success'
  | 'warning';
type Variant = 'border' | 'fill' | 'link';
type Size = 'xs' | 'md' | 'lg';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  variant?: Variant;
  color?: BDColors;
  size?: Size;
  active?: boolean;
  type?: 'submit' | 'reset' | 'button';
  Component?: string | JSXElementConstructor<any>;
  width?: string | number;
  loading?: boolean;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = forwardRef(
  (props: ButtonProps, buttonRef) => {
    const {
      className,
      size = 'md',
      variant = 'border',
      children,
      active,
      width,
      color = 'blue',
      loading = false,
      disabled = false,
      style = {},
      Component = 'button',
      ...rest
    } = props;

    const ref = useRef<typeof Component>(null);
    const colorsBorder: { [P in BDColors]: string } = {
      blue: 'border-blue-600 text-blue-600 transition-all hover:bg-blue-600 hover:text-white',
      magenta:
        'border-magenta-600 text-magenta-600 transition-all hover:bg-magenta-600 hover:text-white',
      primary:
        'border-primary-600 text-primary-600 transition-all hover:bg-primary-600 hover:text-white',
      lightGray: 'border-light-gray-600 text-light-gray-600',
      ghostBlue: 'border-ghost-blue-600 text-ghost-blue-600',
      black: 'border-black-100 text-black-100',
      alert: '',
      success: '',
      warning: '',
    };
    const colorsFill: { [P in BDColors]: string } = {
      blue: 'bg-blue-600 border-blue-600 text-white transition-all hover:bg-blue-500 hover:border-blue-500',
      magenta:
        'bg-magenta-600 border-magenta-600 text-white transition-all hover:bg-magenta-500 hover:border-magenta-500',
      primary:
        'bg-primary-600 border-primary-600 text-white transition-all hover:bg-primary-500 hover:border-primary-500',
      lightGray:
        'bg-light-gray-600 border-light-gray-600 text-primary-600 transition-all hover:bg-light-gray-500 hover:border-light-gray-50',
      ghostBlue:
        'bg-ghost-blue-600 border-ghost-blue-600 text-primary-600 transition-all hover:bg-ghost-blue-500 hover:border-ghost-blue-50',
      black:
        'bg-black-100 border-black-600 text-white transition-all hover:bg-black-200 hover:border-black-50',
      alert: '',
      success: '',
      warning: '',
    };
    const colorsLink: { [P in BDColors]: string } = {
      blue: 'text-blue-600 underline hover:text-blue-500',
      magenta:
        'bg-magenta-600 border-magenta-600 text-white transition-all hover:bg-magenta-500 hover:border-magenta-500',
      primary:
        'text-primary-600 underline transition-all hover:text-primary-400',
      lightGray:
        'bg-light-gray-600 border-light-gray-600 text-primary-600 transition-all hover:bg-light-gray-500 hover:border-light-gray-50',
      ghostBlue:
        'bg-ghost-blue-600 border-ghost-blue-600 text-primary-600 transition-all hover:bg-ghost-blue-500 hover:border-ghost-blue-50',
      black:
        'bg-black-100 border-black-600 text-white transition-all hover:bg-black-200 hover:border-black-50',
      alert: '',
      success: '',
      warning: '',
    };
    const classVariant: { [P in Variant]: string } = {
      border: colorsBorder[color],
      fill: colorsFill[color],
      link: colorsLink[color],
    };
    const classSize: { [P in Size]: string } = {
      xs: 'text-sm py-1 px-3',
      md: 'text-sm py-3 px-7',
      lg: 'text-md py-4 px-9',
    };
    const rootClassName = cn(
      'font-bold rounded-full flex items-center',
      classVariant[variant],
      classSize[size],
      {
        'border-[2px]': variant === 'fill' || variant === 'border',
        '!px-0': variant === 'link',
        '!text-gray-300': disabled && variant === 'link',
        '!border-gray-300 !text-gray-300 hover:!bg-inherit':
          disabled && variant === 'border',
        '!bg-gray-500 !border-gray-500 !text-white':
          disabled && variant === 'fill',
      },
      className
    );

    return (
      <Component
        aria-pressed={active}
        data-variant={variant}
        ref={mergeRefs([ref, buttonRef])}
        className={rootClassName}
        disabled={disabled}
        style={{
          width,
          ...style,
        }}
        {...rest}
      >
        {loading ? size === 'xs' ? <Spinner /> : 'Cargando' : children}
        {loading && size !== 'xs' && (
          <i className='pl-2 m-0 flex'>
            <Spinner size={size} />
          </i>
        )}
      </Component>
    );
  }
);

Button.displayName = 'Button';

export default Button;
