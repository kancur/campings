import classNames from 'classnames';

export const inputClasses = classNames(
  'rounded-lg',
  'flex-1',
  'appearance-none',
  'border',
  'border-gray-200',
  'w-full',
  'py-2',
  'my-1',
  'px-4',
  'bg-white',
  'text-gray-700',
  'placeholder-gray-300',
  'shadow',
  'text-base',
  'focus:outline-none',
  'focus:ring-2',
  'focus:ring-blue-400',
  'focus:border-transparent',
  'disabled:bg-gray-100'
);

export function Input({
  invalid,
  valid,
  className,
  ...props
}: {
  invalid?: boolean;
  valid?: boolean;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  minLength?: number;
  maxLength?: number;
}) {
  const classes =
    classNames({
      'transition-all': true,
      'duration-200': true,
      'ring-2 ring-red-400': invalid,
      'focus:ring-2 focus:ring-red-400': invalid,
      'ring-2 ring-emerald-300': valid,
      'focus:ring-2 focus:ring-emerald-300': valid,
    }) +
    ' ' +
    inputClasses;
  return <input {...props} className={`${classes} ${className}`} />;
}
