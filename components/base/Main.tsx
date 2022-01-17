
type MainProps = {
  children: React.ReactNode;
};

export default function Main({ children, ...props }: MainProps & React.HTMLAttributes<HTMLDivElement>) {
  return <main {...props}>{children}</main>;
}
