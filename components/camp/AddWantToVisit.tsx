import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useSpring, animated } from 'react-spring';
import { useAuth } from '../../context/authContext';
import Router from 'next/router';
import { useFavoriteCamps } from '../../context/favoriteCampsContext';
import { FavoriteCamp } from '../../interfaces/baseInterfaces';

function AddWantToVisit({ id }: { id: string }) {
  const [isAdded, setIsAdded] = useState(false);
  const [styles, api] = useSpring(() => ({ scale: 1 }));
  const auth = useAuth();
  const favorite = useFavoriteCamps();

  useEffect(() => {
    if (favorite.camps.length > 0) {
      const isInFavorites = favorite.camps.some(
        (favoriteCamp) => favoriteCamp.camp._id === id
      );
      if (isAdded !== isInFavorites) {
        setIsAdded(isInFavorites);
      }
    }
  }, [favorite.camps]);

  useEffect(() => {
    api.start({
      to: [{ scale: isAdded ? 1.5 : 1 }, { scale: 1 }],
      from: { scale: 1 },
      config: {
        tension: 170,
        friction: 25,
        precision: 0.02,
        clamp: true,
      },
    });
    return () => {
      api.stop();
    };
  }, [isAdded]);

  const iconStyles = classNames('absolute', 'w-full', 'h-full', 'text-red-500');
  const divStyles = classNames(
    'flex',
    'gap-1',
    'items-center',
    isAdded ? 'bg-red-100' : 'bg-gray-100',
    'py-2',
    'px-3',
    'rounded-full',
    { 'ring-2': isAdded },
    'ring-inset',
    'ring-red-400',
    'box-content',
    'transition-all',
    'duration-100',
    'cursor-pointer',
    'no-highlight',
    'text-sm',
    'text-gray-700'
  );

  const handleClick = () => {
    if (auth.user) {
      if (!isAdded) {
        favorite.add(id);
      } else {
        favorite.delete(id);
      }
      setIsAdded((prev) => !prev);
    } else {
      Router.push('/prihlasenie');
    }
  };

  return (
    <div onClick={handleClick} className={divStyles}>
      <div className="relative w-5 h-5">
        <animated.div style={styles}>
          <div className="w-5 h-5">
            {isAdded ? <FaHeart className={iconStyles} /> : <FaRegHeart className={iconStyles} />}
          </div>
        </animated.div>
      </div>
      <span>Chcem navštíviť</span>
    </div>
  );
}

export default AddWantToVisit;
