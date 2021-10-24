export function ButtonAdmin(props) {
  return (
    <button
      {...props}
      className={`${props.className} button-admin`}
    >
      {props.children}
    </button>
  );
}
