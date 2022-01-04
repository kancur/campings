import Link from 'next/link';
import { useState } from 'react';
import ButtonAdmin from '../general/ButtonAdmin';
import EditableText from '../general/EditableText';
import DeleteButtonWithConfirm from './DeleteButtonWithConfirm';
import { FRONTEND_API_ROUTE } from '../../../OPTIONS';

export default function CampTable(props) {
  const [camps, setCamps] = useState(props.camps);

  const handleSave = (_id, field, value) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve('failed somehow'), 1000);
    });
  };

  async function getConfirm() {
    return await GetConfirmation();
  }

  async function handleCampDelete(id) {
    fetch(`${FRONTEND_API_ROUTE}/camping/${id}`, {
      method: 'DELETE',
    }).then((res) =>
      res.json().then((data) => {
        if (data.status === 'deleted') {
          setCamps(camps.filter((camp) => camp._id !== id));
        }
      })
    );
  }

  return (
    <div className="min-w-full admin-main-wrapper">
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
              <Td>{camp.villages && camp.villages[0].name}</Td>
              <Td>{camp.villages && camp.villages[0]?.parents?.county_name}</Td>
              <Td>
                <div className="flex gap-2 items-stretch">
                  <Link href={`camps/edit/${camp._id}`}>
                    <a>
                      <ButtonAdmin className="bg-amber-500">Edit</ButtonAdmin>
                    </a>
                  </Link>
                  <DeleteButtonWithConfirm
                    onConfirm={() => handleCampDelete(camp._id)}
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
    className="px-5 py-3 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
  >
    {children}
  </th>
);

const Td = ({ children }) => (
  <td className="px-1 py-1 md:px-5 md:py-4 border-b border-gray-200">
    <div>
      <div className="text-gray-900 whitespace-no-wrap">{children}</div>
    </div>
  </td>
);
