import classNames from "classnames";

export function Input({ invalid, valid, className, ...props }) {
  const classes = classNames({
    'transition-all': true,
    'duration-200': true,
    'ring-2 ring-red-400': invalid,
    'focus:ring-2 focus:ring-red-400': invalid,
    'ring-2 ring-green-300': valid,
    'focus:ring-2 focus:ring-green-300': valid,
  });
  return <input {...props} className={`${classes} ${className}`} />;
}
