import { Input } from '../../components/general/Input';
import { useCookies } from 'react-cookie';
import { BACKEND_HOST, FRONTEND_API_ROUTE } from '../../OPTIONS';
import { useEffect, useState } from 'react';
import FormWrapper from '../../components/general/FormWrapper';
import classNames from 'classnames';
var validator = require('validator');
const axios = require('axios').default;

export default function SignupPage() {
  const [cookies, setCookie] = useCookies(['jwt']);
  const [formData, setFormData] = useState({});
  const [isPasswordMatching, setIsPasswordMatching] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);

  useEffect(() => {
    const pwd = formData.password;
    const pwdCheck = formData['password-check'];

    if (pwd && pwdCheck) {
      setIsPasswordMatching(pwd === pwdCheck);
    } else {
      setIsPasswordMatching(true);
    }
  }, [formData]);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const isEmailValid = validator.isEmail(formData.email);
    setIsEmailValid(isEmailValid);

    if (isEmailValid && formData.password?.length > 6) {
      axios
        .post(`${FRONTEND_API_ROUTE}/auth/signup`, formData)
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
    }
  };

  const passwordCheckClassnames = classNames({
    'ring-2 ring-red-500 focus:ring-red-500': !isPasswordMatching,
  });

  const emailCheckClassnames = classNames({
    'ring-2 ring-red-500 focus:ring-red-500': !isEmailValid,
  });

  return (
    <FormWrapper title="Registrácia">
      <form
        onSubmit={onSubmit}
        onInput={handleInputChange}
        className="flex flex-col gap-2"
      >
        <label>
          Email:
          <Input name="email" type="email" className={emailCheckClassnames} />
        </label>
        <label>
          Heslo:
          <Input name="password" type="password" />
        </label>
        <label>
          Zopakuj heslo:
          <Input
            name="password-check"
            type="password"
            className={passwordCheckClassnames}
          />
        </label>
        <Button type="submit">Registrovať</Button>
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
