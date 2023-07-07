import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

type ButtonProps = JSX.IntrinsicElements['button'] & {
  color?: 'blue' | 'white' | 'black';
  leftIcon?: React.ReactNode;
  className?: string;
};

const buttonVariants = cva(
  [
    'rounded-xl',
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
  ],
  {
    variants: {
      color: {
        blue: 'bg-background text-background hover:bg-blue-600 active:bg-blue-700',
        white: 'bg-white text-black hover:bg-gray-100 active:bg-gray-200',
        black: 'bg-black text-white hover:bg-gray-800 active:bg-gray-900',
      },
      size: {
        sm: ['text-sm', 'px-6', 'py-2'],
        lg: ['text-base', 'px-8', 'py-3'],
      },
    },
  },
);

const Button = ({ children, color = 'black', leftIcon, className, ...props }: ButtonProps) => {
  return (
    <button className={twMerge(buttonVariants({ color, size: 'lg' }), className)} {...props}>
      {leftIcon ? <span className="mr-2">{leftIcon}</span> : null}
      {children}
    </button>
  );
};

export default Button;
