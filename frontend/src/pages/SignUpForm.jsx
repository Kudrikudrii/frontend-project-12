import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { setCredentials } from '../slices/authSlice.js';
import routes from '../routes.js';
import * as Yup from 'yup';
import avatar from '../assets/avatar_1-D7Cot-zE.jpg';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { toast } from 'react-toastify';

const SignUpForm = () => {
  const { t } = useTranslation();
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();
  const rollbar = useRollbar();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const [signupFailed, setSignupFailed] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required(t('signup.feedbacks.required'))
      .min(3, t('signup.feedbacks.username'))
      .max(30, t('signup.feedbacks.username')),
    password: Yup.string()
      .min(6, t('signup.feedbacks.password'))
      .required(t('signup.feedbacks.required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('signup.feedbacks.confirmPassword'))
      .required(t('signup.feedbacks.required')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setSignupFailed(false);
      try {
        const response = await axios.post(routes.newUserPath(), {
          username: values.username,
          password: values.password,
        });

        if (response.status === 201) {
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
        } 
      } catch (error) {
        console.error('Ошибка при создании аккаунта:', error);
        rollbar.error('Ошибка при создании аккаунта:', error, {
          endpoint: routes.newUserPath(),
          method: 'POST',
          timestamp: new Date().toISOString(),
          username: values.username,
          component: 'SignUpForm',
          action: formik
        });
        if (error.status === 'FETCH_ERROR') {
          toast.error(t('toast.fetchError'))
        }
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
                  to="/">{t('mainHeader.hexletChat')}
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
                          className="rounded-circle img-fluid" 
                          alt="Регистрация" 
                        />
                      </div>
                      <Form
                        onSubmit={formik.handleSubmit}
                        className='col-12 col-md-6 mt-3 mt-md-0'
                      >
                        <h1 className='text-center mb-4'>{t('signup.header')}</h1>
                        <fieldset>
                          <Form.Group className='form-floating mb-3'>
                            <Form.Control
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.username}
                              placeholder={t('signup.feedbacks.username')}
                              name='username'
                              id='username'
                              autoComplete='username'
                              isInvalid={(formik.touched.username && !!formik.errors.username) || signupFailed}
                              required
                              ref={inputRef}
                            />
                            <Form.Label htmlFor='username'>{t('signup.username')}</Form.Label>
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.username}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group className='form-floating mb-3'>
                            <Form.Control
                              type='password'
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.password}
                              placeholder={t('signup.feedbacks.password')}
                              name='password'
                              id='password'
                              autoComplete='new-password'
                              isInvalid={(formik.touched.password && !!formik.errors.password) || signupFailed}
                              required
                            />
                            <Form.Label htmlFor='password'>{t('signup.password')}</Form.Label>
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.password}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group className='form-floating mb-4'>
                            <Form.Control
                              type='password'
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.confirmPassword}
                              placeholder={t('signup.feedbacks.uniqueUser')}
                              name='confirmPassword'
                              id='confirmPassword'
                              autoComplete='new-password'
                              isInvalid={(formik.touched.confirmPassword && !!formik.errors.confirmPassword) || signupFailed}
                              required
                            />
                            <Form.Label htmlFor='confirmPassword'>{t('signup.confirmPassword')}</Form.Label>
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.confirmPassword}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Button
                            className='w-100 mb-3 btn btn-outline-primary'
                            type='submit'
                            variant='outline-primary'
                            disabled={formik.isSubmitting}
                          >
                            {t('signup.submit')}
                          </Button>
                        </fieldset>
                      </Form>
                    </div>
                    <div className='card-footer p-4'></div>
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

export default SignUpForm;