import { FaEdit } from 'react-icons/fa';
import { EditableText } from '../EditableText';

export default function CampTable({ camps }) {

  const handleSave = (_id, field, value) => {
    console.log('handling saving of id', _id, '| field:', field, '| value:', value)
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve("failed somehow"), 1000)
    })
  }

  return (
    <div className="container mx-auto">
      <div>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <Th>Name</Th>
                  <Th>Coords</Th>
                  <Th></Th>
                </tr>
              </thead>
              <tbody>
                {camps.map((camp) => (
                  <tr key={camp._id}>
                    <Td>
                      <div className="flex">
                        <EditableText text={camp.name} onSave={(value) => handleSave(camp._id, "name", value)} />
                      </div>
                    </Td>
                    <Td>
                      {camp.coords.lat}, {camp.coords.lon}
                    </Td>
                    <Td>Edit me</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const Th = ({ children }) => (
  <th
    scope="col"
    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
  >
    {children}
  </th>
);

const Td = ({ children }) => (
  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
    <div className="ml-3">
      <div className="text-gray-900 whitespace-no-wrap">{children}</div>
    </div>
  </td>
);
