import { Input } from '../../components/general/Input';
import { useCookies } from 'react-cookie';
import { BACKEND_HOST } from '../../OPTIONS';
import { useState } from 'react';
import FormWrapper from '../../components/general/FormWrapper';
const axios = require('axios').default;

export default function SignupPage() {
  const [cookies, setCookie] = useCookies(['jwt']);
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${BACKEND_HOST}/api/auth/login`, formData)
      .then(function (response) {
        console.log(response.data);
        if (response.data.jwt) {
          // since this will not be an http-only cookie, it can be fetched by any script from document.cookie
          // unsafe and suspectible to attacks, but doesnt really matter for this website
          // POSSIBLE UPGRADE:
          // use a next.js api endpoint as a proxy to api calls and handle setting http-only cookies there
          setCookie('jwt', response.data.jwt, {
            path: '/',
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <FormWrapper title="Prihlásenie">
      <form
        onSubmit={onSubmit}
        onInput={handleInputChange}
        className="flex flex-col gap-2"
      >
        <label>
          Email:
          <Input name="email" type="email" />
        </label>
        <label>
          Heslo:
          <Input name="password" type="password" />
        </label>
        <Button type="submit">Prihlásiť</Button>
      </form>
    </FormWrapper>
  );
}

const Button = ({ children, ...props }) => (
  <button
    {...props}
    className="bg-green-600 hover:bg-green-500 transition-colors duration-75 py-3 px-4 rounded-xl text-gray-100 font-semibold text-lg focus:ring-2"
  >
    {children}
  </button>
);
