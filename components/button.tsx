type ButtonProps = JSX.IntrinsicElements['button'];

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      className="transition-color rounded-xl border border-transparent bg-black px-8 py-3 text-background hover:border-gray-500 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 active:bg-gray-900"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
