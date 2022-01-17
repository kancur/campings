import { Input } from '../../components/general/Input';
import { useCookies } from 'react-cookie';
import React, { useEffect, useState } from 'react';
import FormWrapper from '../../components/general/FormWrapper';
import classNames from 'classnames';
import LoaderFullscreen from '../../components/general/LoaderFullscreen';
import { usePreviousPath } from '../../context/pathHistoryContext';
import Link from 'next/link';
import { AxiosError } from 'axios';
import Router from 'next/router';
var validator = require('validator');
const axios = require('axios').default;

type IError = {
  email?: string | null;
  password?: string | null;
  passwordConfirmatiom?: string | null;
};

type IFormData = {
  email: string | '';
  password: string | '';
  passwordCheck: string | '';
};

export default function SignupPage() {
  const [cookies, setCookie] = useCookies(['jwt']);
  const [isFetching, setIsFetching] = useState(false);
  const [formData, setFormData] = useState<IFormData>({
    email: '',
    password: '',
    passwordCheck: '',
  });
  const [error, setError] = useState<IError>({
    email: null,
    password: null,
    passwordConfirmatiom: null,
  });
  const prevPath = usePreviousPath();

  const handleInputChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent) => {
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

    if (formData.password !== formData['passwordCheck']) {
      return setError((prev) => ({
        ...prev,
        passwordConfirmatiom: 'Heslá sa nezhodujú',
      }));
    }

    if (!error.email && !error.password && !error.passwordConfirmatiom) {
      setIsFetching(true);
      axios
        .post(`${process.env.NEXT_PUBLIC_FRONTEND_API_ROUTE}/auth/signup`, formData)
        .then(function (response: {data: {jwt: string}}) {
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
        .catch(function (error: AxiosError) {
          setIsFetching(false);
          if (error.response?.data?.error?.code === 11000) {
            setError((prev) => ({ ...prev, email: 'Email už existuje' }));
          }
          console.log('error', error.message);
        });
    }
  };

  const ErrorLabel = ({ children }: {children: React.ReactNode}) => <p className="text-red-500 flex gap-2">{children}</p>;

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
            <Input name="passwordCheck" type="password" className={passwordCheckClassnames} />
            {error.passwordConfirmatiom && <ErrorLabel>{error.passwordConfirmatiom}</ErrorLabel>}
          </label>
          <Button type="submit">Registrovať</Button>
        </form>
      </FormWrapper>
    </>
  );
}

type IButton = {
  children: React.ReactNode;
}

const Button = ({ children, ...props }: IButton & React.ComponentProps<'button'>) => (
  <button
    {...props}
    className="bg-emerald-600 hover:bg-emerald-500 transition-colors duration-75 py-3 px-4 rounded-xl text-gray-100 font-semibold text-lg focus:ring-2"
  >
    {children}
  </button>
);
