import { Input } from '../../components/general/Input';
import { useCookies } from 'react-cookie';
import { BACKEND_HOST, FRONTEND_API_ROUTE } from '../../OPTIONS';
import { useEffect, useState } from 'react';
import FormWrapper from '../../components/general/FormWrapper';
import classNames from 'classnames';
import LoaderFullscreen from '../../components/general/LoaderFullscreen';
import { usePreviousPath } from '../../context/pathHistoryContext';
import Link from 'next/link';
var validator = require('validator');
const axios = require('axios').default;

export default function SignupPage() {
  const [cookies, setCookie] = useCookies(['jwt']);
  const [isFetching, setIsFetching] = useState(false);
  const [formData, setFormData] = useState({});
  const [isPasswordMatching, setIsPasswordMatching] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [error, setError] = useState({
    email: null,
    password: null,
    passwordConfirmatiom: null,
  });
  const prevPath = usePreviousPath();

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
    setError({ email: null, password: null, passwordConfirmatiom: null });
    e.preventDefault();
    const isEmailValid = validator.isEmail(formData.email);

    if (!isEmailValid) {
      return setError({ ...error, email: 'Neplatný email' });
    }

    if (formData.password?.length <= 6) {
      return setError((prev) => ({
        ...prev,
        password: 'Heslo musí mať aspoň 7 znakov',
      }));
    }

    if (formData.password !== formData['password-check']) {
      return setError((prev) => ({
        ...prev,
        passwordConfirmatiom: 'Heslá sa nezhodujú',
      }));
    }

    if (!error.email && !error.password && !error.passwordConfirmatiom) {
      setIsFetching(true);
      axios
        .post(`${FRONTEND_API_ROUTE}/auth/signup`, formData)
        .then(function (response) {
          if (response.data.jwt) {
            // since this will not be an http-only cookie, it can be fetched by any script from document.cookie
            // unsafe and suspectible to attacks, but doesnt really matter for this website
            // POSSIBLE UPGRADE:
            // use a next.js api endpoint as a proxy to api calls and handle setting http-only cookies there
            setCookie('jwt', response.data.jwt, {
              path: '/',
            });
          }
          setIsFetching(false);
          if (prevPath === '/dovidenia') {
            Router.push('/');
          } else if (prevPath === undefined) {
            Router.push('/');
          } else if (prevPath === 'registracia') {
            Router.push('/');
          } else {
            Router.push(prevPath);
          }
        })
        .catch(function (error) {
          setIsFetching(false);
          if (error.response?.data?.error?.code === 11000) {
            setError((prev) => ({ ...prev, email: 'Email už existuje' }));
          }
          console.log('error', error.message);
        });
    }
  };

  const ErrorLabel = ({ children }) => (
    <p className="text-red-500 flex gap-2">{children}</p>
  );

  const passwordCheckClassnames = classNames({
    'ring-2 ring-red-500 focus:ring-red-500': error.passwordConfirmatiom,
  });

  const emailCheckClassnames = classNames({
    'ring-2 ring-red-500 focus:ring-red-500': error.email,
  });

  return (
    <>
      {isFetching && <LoaderFullscreen>Prebieha registrácia</LoaderFullscreen>}

      <FormWrapper title="Registrácia">
        <form
          onSubmit={onSubmit}
          onInput={handleInputChange}
          className="flex flex-col gap-2 text-gray-600"
        >
          <label>
            Email:
            <Input name="email" type="email" className={emailCheckClassnames} />
            {error.email && (
              <ErrorLabel>
                {error.email}
                {error.email === 'Email už existuje' && (
                  <Link href="/prihlasenie">(Prihlásiť sa)</Link>
                )}
              </ErrorLabel>
            )}
          </label>
          <label>
            Heslo:
            <Input name="password" type="password" />
            {error.password && <ErrorLabel>{error.password}</ErrorLabel>}
          </label>
          <label>
            Zopakuj heslo:
            <Input
              name="password-check"
              type="password"
              className={passwordCheckClassnames}
            />
            {error.passwordConfirmatiom && (
              <ErrorLabel>{error.passwordConfirmatiom}</ErrorLabel>
            )}
          </label>
          <Button type="submit">Registrovať</Button>
        </form>
      </FormWrapper>
    </>
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
