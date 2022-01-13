type MainProps = {
  children: React.ReactNode;
  props?: any;
};

export default function Main({ children, ...props }: MainProps) {
  return <main {...props}>{children}</main>;
}
