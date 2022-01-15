import { Input } from '../../components/general/Input';
import { useCookies } from 'react-cookie';
import { BACKEND_HOST, FRONTEND_API_ROUTE } from '../../OPTIONS';
import { useEffect, useState } from 'react';
import FormWrapper from '../../components/general/FormWrapper';
import LoaderFullscreen from '../../components/general/LoaderFullscreen';
import { useRouter } from 'next/router';
import Router from 'next/router';
import { usePreviousPath } from '../../context/pathHistoryContext';
import Link from 'next/link';
const axios = require('axios').default;

const EMAIL_DOESNT_EXIST = 'Zadaný email neexistuje';
const INCORRECT_PASSWORD = 'Nesprávne heslo';

export default function LoginPage() {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(['jwt']);
  const [formData, setFormData] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState({ email: null, password: null });
  const prevPath = usePreviousPath();

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmit = (e) => {
    setError({ email: null, password: null });
    e.preventDefault();
    setIsFetching(true);
    axios
      .post(`${FRONTEND_API_ROUTE}/auth/login`, formData)
      .then(function (response) {
        if (response.data.jwt) {
          // since this will not be an http-only cookie, it can be fetched by any script from document.cookie
          // unsafe and suspectible to attacks, but doesnt really matter for this website
          // POSSIBLE UPGRADE:
          // use a next.js api endpoint as a proxy to api calls and handle setting http-only cookies there
          setCookie('jwt', response.data.jwt, {
            path: '/',
          });
          setIsFetching(false);

          // handle redirect based on previous path
          if (prevPath === '/dovidenia') {
            Router.push('/');
          } else if (prevPath === undefined) {
            Router.push('/');
          } else if (prevPath === '/prihlasenie') {
            Router.push('/');
          } else {
            Router.push(prevPath);
          }
        }
      })
      .catch(function (error) {
        setIsFetching(false);
        const errorBody = error?.response?.data?.error;
        if (!errorBody) return console.error('error:', error);

        if (errorBody.toLowerCase() == 'incorrect email') {
          setError((prev) => ({ ...prev, email: EMAIL_DOESNT_EXIST }));
        }

        if (errorBody.toLowerCase() == 'incorrect password') {
          setError((prev) => ({ ...prev, password: INCORRECT_PASSWORD }));
        }
      });
  };

  return (
    <>
      {isFetching && <LoaderFullscreen>Prihlasujem</LoaderFullscreen>}
      <FormWrapper title="Prihlásenie">
        <form
          onSubmit={onSubmit}
          onInput={handleInputChange}
          className="flex flex-col gap-2 text-gray-600"
        >
          <label>
            Email:
            <Input name="email" type="email" />
            {error.email && <p className="text-red-500">{error.email}</p>}
          </label>
          <label>
            Heslo:
            <Input name="password" type="password" />
            {error.password && <p className="text-red-500">{error.password}</p>}
          </label>
          <p className="text-center">
            Nemáš účet? <Link href="/registracia">Zaregistruj sa</Link>
          </p>
          <Button type="submit">Prihlásiť</Button>
        </form>
      </FormWrapper>
    </>
  );
}

const Button = ({ children, ...props }) => (
  <button
    {...props}
    className="bg-emerald-600 hover:bg-emerald-500 transition-colors duration-75 py-3 px-4 rounded-xl text-gray-100 font-semibold text-lg focus:ring-2"
  >
    {children}
  </button>
);
