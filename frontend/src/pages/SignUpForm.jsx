import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { setCredentials } from '../slices/authSlice.js';
import routes from '../routes.js';
import * as Yup from 'yup';

const SignUpPage = () => {
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const [signupFailed, setSignupFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле'),
    password: Yup.string()
      .min(6, 'Не менее 6 символов')
      .required('Обязательное поле'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
      .required('Обязательное поле'),
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
        } else if (response.status === 409) {
          setSignupFailed(true);
          setErrorMessage('Ошибка при регистрации');
        } else {
          setSignupFailed(true);
          setErrorMessage('Такой пользователь уже существует');
        }
      } catch (err) {
        console.error("Ошибка:", {
          status: err.response?.status, 
          data: err.response?.data, 
          headers: err.response?.headers,
        });

        if (err.isAxiosError) {
          setSignupFailed(true);
          setErrorMessage(err.response?.data?.message || 'Ошибка при регистрации');
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
                <Link className="navbar-brand" to="/">Hexlet Chat</Link>
              </div>
            </nav>
            <div className='container-fluid h-100'>
              <div className='row justify-content-center align-content-center h-100'>
                <div className='col-12 col-md-8 col-xxl-6'>
                  <div className='card shadow-sm'>
                    <div className='card-body row p-5'>
                      <div className='col-12 col-md-6 d-flex align-items-center justify-content-center'>
                        <img 
                          src="/assets/avatar_1-D7Cot-zE.jpg" 
                          className="rounded-circle img-fluid" 
                          alt="Регистрация" 
                        />
                      </div>
                      <Form
                        onSubmit={formik.handleSubmit}
                        className='col-12 col-md-6 mt-3 mt-md-0'
                      >
                        <h1 className='text-center mb-4'>Регистрация</h1>
                        <fieldset>
                          <Form.Group className='form-floating mb-3'>
                            <Form.Control
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.username}
                              placeholder='От 3 до 20 символов'
                              name='username'
                              id='username'
                              autoComplete='username'
                              isInvalid={(formik.touched.username && !!formik.errors.username) || signupFailed}
                              required
                              ref={inputRef}
                            />
                            <Form.Label htmlFor='username'>Имя пользователя</Form.Label>
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
                              placeholder='Не менее 6 символов'
                              name='password'
                              id='password'
                              autoComplete='new-password'
                              isInvalid={(formik.touched.password && !!formik.errors.password) || signupFailed}
                              required
                            />
                            <Form.Label htmlFor='password'>Пароль</Form.Label>
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
                              placeholder='Пароли должны совпадать'
                              name='confirmPassword'
                              id='confirmPassword'
                              autoComplete='new-password'
                              isInvalid={(formik.touched.confirmPassword && !!formik.errors.confirmPassword) || signupFailed}
                              required
                            />
                            <Form.Label htmlFor='confirmPassword'>Подтвердите пароль</Form.Label>
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.confirmPassword || errorMessage}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Button
                            className='w-100 mb-3 btn btn-outline-primary'
                            type='submit'
                            variant='outline-primary'
                            disabled={formik.isSubmitting}
                          >
                            Зарегистрироваться
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

export default SignUpPage;