import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

type ButtonProps = JSX.IntrinsicElements['button'] & {
  color?: 'blue' | 'white' | 'black' | 'transparent';
  leftIcon?: React.ReactNode;
  href?: string;
  isIcon?: boolean;
  size?: 'sm' | 'lg';
};

const buttonVariants = cva(
  [
    'rounded-xl',
    'font-martian',
    'border',
    'border-transparent',
    'px-8',
    'py-3',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'flex',
    'items-center',
    'justify-center',
    'disabled:cursor-not-allowed',
  ],
  {
    variants: {
      color: {
        blue: 'bg-background text-white hover:bg-[#008EB5] active:bg-[#006884]',
        white: 'bg-white text-black hover:bg-gray-100 active:bg-gray-200',
        black: 'bg-black text-white hover:bg-gray-800 active:bg-gray-900',
        transparent: 'bg-transparent',
      },
      size: {
        sm: ['text-sm', 'px-6', 'py-2'],
        lg: ['text-base', 'px-8', 'py-3'],
      },
      disabled: {
        true: 'aria-disabled cursor-not-allowed bg-gray-500 text-gray-900',
        false: '',
      },
    },
  },
);

const Button = ({
  children,
  color = 'black',
  leftIcon,
  className,
  href,
  isIcon,
  onClick,
  disabled,
  size = 'lg',
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={href ? () => window.open(href, '_blank') : onClick}
      className={twMerge(
        buttonVariants({ color: !disabled ? color : undefined, size: 'lg', disabled }),
        className,
      )}
      {...props}
    >
      {leftIcon ? <span className="mr-4">{leftIcon}</span> : null}
      {children}
    </button>
  );
};

export default Button;
