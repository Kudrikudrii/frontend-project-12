import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { setCredentials } from '../slices/authSlice.js';
import routes from '../routes.js';
import avatar from '../assets/avatar-DIE1AEpS.jpg';
import { useTranslation, Trans } from 'react-i18next';

const LoginPage = () => {
  const { t } = useTranslation();
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const [authFailed, setAuthFailed] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const response = await axios.post(routes.loginPath(), values);
        if (response.status === 200) {
          console.log(response.data);
          const { username, token } = response.data;
          dispatcher(
            setCredentials({
              username,
              token,
            })
          );
          localStorage.setItem('token', token);
          localStorage.setItem('username', username);
          navigate('/');
        } else {
          setAuthFailed(true);
        }
      } catch (err) {
        ("Ошибка:", {
          status: err.response?.status, 
          data: err.response?.data, 
          headers: err.response?.headers,
        });
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className="h-100 bg-light">
      <div className="h-100">
        <div className="h-100" id="chat">
          <div className='d-flex flex-column h-100'>
            <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
              <div className="container">
                <Link
                  className="navbar-brand"
                  to="/"
                >
                  {t('mainHeader.hexletChat')}
                </Link>
              </div>
            </nav>
            <div className='container-fluid h-100'>
              <div className='row justify-content-center align-content-center h-100'>
                <div className='col-12 col-md-8 col-xxl-6'>
                  <div className='card shadow-sm'>
                    <div className='card-body row p-5'>
                      <div className='col-12 col-md-6 d-flex align-items-center justify-content-center'>
                        <img 
                          src={avatar}
                          className="rounded-circle" 
                          alt="Войти"
                        />
                      </div>
                      <Form
                        onSubmit={formik.handleSubmit}
                        className='col-12 col-md-6 mt-3 mt-md-0'
                      >
                        <h1 className='text-center mb-4'>{t('loginPage.header')}</h1>
                        <fieldset>
                          <Form.Group className='form-floating mb-3'>
                            <Form.Control
                              onChange={formik.handleChange}
                              value={formik.values.username}
                              placeholder={t('loginPage.username')}
                              name='username'
                              id='username'
                              autoComplete='username'
                              isInvalid={authFailed}
                              required
                              ref={inputRef}
                            />
                            <Form.Label htmlFor='username'>{t('loginPage.username')}</Form.Label>
                          </Form.Group>
                          <Form.Group className='form-floating mb-4'>
                            <Form.Control
                              type='password'
                              onChange={formik.handleChange}
                              value={formik.values.password}
                              placeholder={t('loginPage.password')}
                              name='password'
                              id='password'
                              autoComplete='current-password'
                              isInvalid={authFailed}
                              required
                            />
                            <Form.Label htmlFor='password'>{t('loginPage.password')}</Form.Label>
                            <Form.Control.Feedback type='invalid'>
                              {t('loginPage.invalidPassword')}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Button
                            className='w-100 mb-3 btn btn-outline-primary'
                            type='submit'
                            variant='outline-primary'
                          >
                            {t('loginPage.submit')}
                          </Button>
                        </fieldset>
                      </Form>
                    </div>
                    <div className='card-footer p-4 d-flex align-items-center justify-content-center'>
                      <div className="text-center">
                        <Trans 
                          i18nKey="loginPage.noSignUpWithLink"
                          components={{
                            1: <Link to="/signup" className="text-decoration-none" />
                          }}
                        />                      
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;