import { Dropdown } from '../../general/SearchSuggestionsDropdown';
import {
  FaMountain,
  FaHome,
  FaTree,
  FaThumbtack,
  FaWater,
} from 'react-icons/fa';
import ValleyIcon from '../../../public/icons/Valley-tree';
import FlatIcon from '../../../public/icons/Flat';
import PlateauIcon from '../../../public/icons/Plateau';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import OutsideClickHandler from 'react-outside-click-handler';

const TentIcon = (props) => (
  <svg
    viewBox="0 0 455 455"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M430.473 415.471l-187.43-301.385 55.25-88.84-25.84-15.717-47.216 75.924L178.02 9.529l-25.84 15.716 55.25 88.841L20 415.471s-20 30 0 30h410.473c19.527 0 0-30 0-30zm-146.433 0L225.38 294.72l-58.906 120.751h-33.679s22.208-189.968 92.642-189.91c70.377.058 92.257 189.91 92.257 189.91z" />
  </svg>
);

export default function LocationPickerDropdown({
  locations,
  activeIndex,
  handleClick,
  handleClose,
}) {
  // selectedIndex is used for styling purposes
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    setSelectedIndex(activeIndex);
  }, [activeIndex]);

  return (
    <Dropdown>
      <OutsideClickHandler onOutsideClick={handleClose}>
        <ul id="suggestions" className="flex flex-col divide-y divide-gray-200">
          {locations.map((loc, index) => (
            <li
              key={index}
              onMouseEnter={() => setSelectedIndex(index)}
              onMouseLeave={() => setSelectedIndex(-1)}
              onClick={() => handleClick(index)}
              className={classNames(
                'flex items-center py-1 pr-3 cursor-pointer',
                index === selectedIndex && 'bg-gray-200'
              )}
              tabIndex="-1"
              role="menuitem"
            >
              <div className="flex-shrink-0">{getIcon(loc.type)}</div>
              <div className="text-left">
                <p>{loc.name}</p>
                <p className="text-xs text-gray-400">{loc.county_name}</p>
              </div>
            </li>
          ))}
        </ul>
      </OutsideClickHandler>
    </Dropdown>
  );
}

function getIcon(type) {
  switch (type) {
    case 'village':
      return <FaHome className="h-4 w-4 px-2 text-yellow-500 box-content" />;
    case 'mountain_range':
      return <FaMountain className="h-4 w-4 px-2 text-gray-600 box-content" />;
    case 'basin':
      return <FaTree className="h-4 w-4 px-2 text-green-600 box-content" />;
    case 'valley':
      return (
        <ValleyIcon className="h-4 w-4 px-2 text-indigo-500 box-content fill-current" />
      );
    case 'flat':
      return (
        <FlatIcon className="h-4 w-4 px-2 text-yellow-800 box-content fill-current" />
      );
    case 'plain':
      return (
        <FlatIcon className="h-4 w-4 px-2 text-yellow-800 box-content fill-current" />
      );
    case 'plateau':
      return <PlateauIcon className="suggestion-icon text-green-800" />;
    case 'waterbody':
      return <FaWater className="suggestion-icon text-blue-500" />;
    case 'camp':
      return <TentIcon className="suggestion-icon text-pink-500"/>;
    default:
      return <FaThumbtack className="suggestion-icon text-gray-500" />;
      break;
  }
}


