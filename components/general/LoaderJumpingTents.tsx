import React from 'react';

const ANIMATION_DELAY = 120; //miliseconds
const NUMBER_OF_ICONS = 5;

type LoaderJumpingTentsProps = {
  className: string;
  props?: any;
};

export default function LoaderJumpingTents({ className, ...props }: LoaderJumpingTentsProps) {
  const icons = [];
  for (let delay = 0; delay < ANIMATION_DELAY * NUMBER_OF_ICONS; delay += ANIMATION_DELAY) {
    icons.push(<TentIcon key={delay} delay={delay} />);
  }

  return (
    <span {...props} className={`mx-auto p-4 fill-current flex ${className}`}>
      {icons}
    </span>
  );
}

type TentIconProps = {
  /**
   * Animation delay in miliseconds
   */
  delay: number;
};

const TentIcon = ({ delay }: TentIconProps) => (
  <svg
    viewBox="0 0 455 455"
    xmlns="http://www.w3.org/2000/svg"
    className="animate-loaderBounce"
    style={{ animationDelay: `${delay}ms` }}
  >
    <path d="M430.473 415.471l-187.43-301.385 55.25-88.84-25.84-15.717-47.216 75.924L178.02 9.529l-25.84 15.716 55.25 88.841L20 415.471s-20 30 0 30h410.473c19.527 0 0-30 0-30zm-146.433 0L225.38 294.72l-58.906 120.751h-33.679s22.208-189.968 92.642-189.91c70.377.058 92.257 189.91 92.257 189.91z" />
  </svg>
);
