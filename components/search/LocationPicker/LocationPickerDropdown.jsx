import { Dropdown } from "../../universal/Dropdown";
import { FaMountain, FaHome, FaTree } from "react-icons/fa";
import { ReactComponent as ValleyIcon } from "../../../media/valley-tree.svg";
import { ReactComponent as FlatIcon } from "../../../media/flat.svg";
import { classNames } from "../../../helper_functions/classNames";

export default function LocationPickerDropdown({
  locations,
  activeIndex,
  setActiveIndex,
  handleClick,
}) {
  return (
    <Dropdown>
      <ul id="suggestions" className="flex flex-col divide-y divide-gray-200">
        {locations.map((loc, index) => (
          <li
            key={loc.node_id}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(-1)}
            onClick={() => handleClick(index)}
            className={classNames(
              "flex items-center py-1 pr-3 cursor-pointer",
              index === activeIndex && "bg-gray-200"
            )}
            tabIndex="-1"
            role="menuitem"
          >
            {getIcon(loc.type)}
            <div>
              <p>{loc.name}</p>
              <p className="text-xs text-gray-400">{loc.county_name}</p>
            </div>
          </li>
        ))}
      </ul>
    </Dropdown>
  );
}

function getIcon(type) {
  switch (type) {
    case "village":
      return <FaHome className="h-4 w-4 px-2 text-yellow-500 box-content" />;
    case "mountain_range":
      return <FaMountain className="h-4 w-4 px-2 text-gray-600 box-content" />;
    case "basin":
      return <FaTree className="h-4 w-4 px-2 text-green-600 box-content" />;
    case "valley":
      return (
        <ValleyIcon className="h-4 w-4 px-2 text-indigo-500 box-content fill-current" />
      );
    case "flat":
      return (
        <FlatIcon className="h-4 w-4 px-2 text-yellow-800 box-content fill-current" />
      );
    case "plain":
      return (
        <FlatIcon className="h-4 w-4 px-2 text-yellow-800 box-content fill-current" />
      );
    default:
      break;
  }
}
