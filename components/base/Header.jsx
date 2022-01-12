import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useMeasure } from 'react-use';
import HeaderNav from './Menu/HeaderNav';
import { useSpring, animated } from 'react-spring';
import { useMediaQuery } from 'react-responsive';
import MobileMenu from './Menu/MobileMenu';

export default function Header(props) {
  // use to open/close the menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // handles display:none of the menu, so its not focusable when not visible
  const [isMenuDisplayNone, setMenuDisplayNone] = useState(true);
  // measures the height of the mobile menu
  const [ref, { height }] = useMeasure();
  const isNotMobile = useMediaQuery({ query: '(min-width: 640px)' });

  useEffect(() => {
    if (isNotMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [isNotMobile]);

  // hiding the menu after closing animation ends so its not focusable
  useEffect(() => {
    if (isMobileMenuOpen) {
      setMenuDisplayNone(false);
    }
  }, [isMobileMenuOpen]);

  const handleAnimationRest = () => {
    if (!isMobileMenuOpen) {
      setMenuDisplayNone(true);
    }
  };

  const handleMenuLinkClick = () => {
    setIsMobileMenuOpen(false);
    setMenuDisplayNone(true);
  };

  // not using usetransition instead of usespring because I cannot get height of unmounted component
  const mobileMenuStyles = useSpring({
    to: { height: isMobileMenuOpen ? `${height}px` : '0px' },
    onRest: () => handleAnimationRest(),
    delay: 100,
  });

  return (
    <>
      <header className="bg-gray-100 p-4 z-30 flex flex-col justify-center min-h-header">
        <div className="flex justify-between">
          <div className="flex">
            <Link href="/">
              <a className="max-w-logo min-w-full block self-center">
                <Image
                  src="/media/najkempy-logo2.png"
                  className="min-w-full"
                  width="800px"
                  height="150px"
                />
              </a>
            </Link>
          </div>
          <div className="flex justify-end">
            <HeaderNav setIsMobileMenuOpen={setIsMobileMenuOpen} />
          </div>
        </div>
        {props.children}
      </header>
      <animated.div style={mobileMenuStyles}>
        <div ref={ref} className={`${isMenuDisplayNone ? 'hidden' : ''}`}>
          <MobileMenu close={handleMenuLinkClick} />
        </div>
      </animated.div>
    </>
  );
}
