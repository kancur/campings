import ButtonAdmin from '../general/ButtonAdmin';
import EditableText from '../general/EditableText';
import { DeleteButtonWithConfirm } from './DeleteCampButton';

export default function CampTable({ camps }) {
  const handleSave = (_id, field, value) => {
    console.log(
      'handling saving of id',
      _id,
      '| field:',
      field,
      '| value:',
      value
    );
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve('failed somehow'), 1000);
    });
  };

  async function getConfirm() {
    console.log('getting confirmation');
    const result = await GetConfirmation();
    console.log('confirm result:', result);
  }

  async function handleCampDelete(camp) {
    console.log('handling camp delete -->', camp.name);
    getConfirm();
  }

  return (
    <div className="min-w-full shadow rounded-md p-2 bg-white">
      <table className="min-w-full leading-normal max-w-full">
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Obec</Th>
            <Th>Kraj</Th>
            <Th></Th>
          </tr>
        </thead>
        <tbody>
          {camps.map((camp) => (
            <tr key={camp._id}>
              <Td>
                <div className="flex">
                  <EditableText
                    text={camp.name}
                    onSave={(value) => handleSave(camp._id, 'name', value)}
                    minLength={3}
                  />
                </div>
              </Td>
              <Td>{camp.villages[0].name}</Td>
              <Td>{camp.villages[0].parents.county_name}</Td>
              <Td>
                <div className="flex gap-2 items-stretch">
                  <ButtonAdmin className="bg-yellow-500">Edit</ButtonAdmin>
                  <DeleteButtonWithConfirm
                    onConfirm={() => console.log('youhuuuu, confirmed')}
                    confirmationMsg={`Are you sure you want to delete camp "${camp.name}"? This action cannot be undone.`}
                  />
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
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
    <div>
      <div className="text-gray-900 whitespace-no-wrap">{children}</div>
    </div>
  </td>
);
