type ButtonProps = JSX.IntrinsicElements['button'];

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button className="rounded-xl bg-black px-8 py-3 text-background" {...props}>
      {children}
    </button>
  );
};

export default Button;
