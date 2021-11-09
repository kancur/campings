import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BurgerMenu } from './Menu/BurgerMenu';
import { useMeasure } from 'react-use';
import HeaderMenu from './Menu/HeaderMenu';
import { useSpring, animated, useTransition } from 'react-spring';

export default function Header(props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-gray-100 p-4 z-30 flex flex-col justify-center min-h-header">
        <div className="flex justify-between">
          <div className="flex">
            <Link href="/">
              <a className="max-w-logo min-w-full block self-center">
                {/* <h1 className="text-4xl	text-brand font-bold px-4 py-1">Najkempy.sk</h1> */}
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
            <HeaderMenu setIsMobileMenuOpen={setIsMobileMenuOpen} />
          </div>
        </div>
        {props.children}
      </header>
      <MobileMenuMountTransition show={isMobileMenuOpen} />
      {/* <div ref={ref}>{isMobileMenuOpen && <BurgerMenu />}</div> */}
    </>
  );
}

function MobileMenuMountTransition({ show }) {
  const [ref, { height }] = useMeasure();


  useEffect(() => {
    console.log(height);
  }, [height])
  
  const transitions = useTransition(show, {
    from: { height: '0px' },
    enter: { height: `${height}px` },
    leave: { height: '0px' },
    reverse: show,
  });
  return transitions(
    (styles, item) =>
      item && (
        <animated.div style={styles}>
          <div ref={ref} >
          <BurgerMenu />
          </div>
        </animated.div>
      )
  );
}
