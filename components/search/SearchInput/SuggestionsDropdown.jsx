import { Dropdown } from '../../general/Dropdown';
import { FaMountain, FaHome, FaTree } from 'react-icons/fa';
import ValleyIcon from '../../../public/icons/Valley-tree';
import FlatIcon from '../../../public/icons/Flat';
import PlateauIcon from '../../../public/icons/Plateau';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import OutsideClickHandler from 'react-outside-click-handler';

export default function LocationPickerDropdown({
  locations,
  activeIndex,
  handleClick,
  handleClose
}) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    setSelectedIndex(activeIndex);
  }, [activeIndex]);

  return (
    <Dropdown>
      <OutsideClickHandler
        onOutsideClick={handleClose}
      >
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
              {getIcon(loc.type)}
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
      return (
        <PlateauIcon className="h-4 w-4 px-2 text-green-800 box-content fill-current" />
      );
    default:
      break;
  }
}
