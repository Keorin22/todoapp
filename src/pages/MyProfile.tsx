import React, { useState } from 'react';
import {  useSelector } from 'react-redux';
import { authReducer, fetchAuth } from '../store/auth';
import { FormValues, StateAuth } from '../store/types';
import { useAppDispatch } from '../utils/appDispatch';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store/store';



const MyProfile = () => {
  const [formValues, setFormValues] = useState<FormValues>({ email: '', password: '' });
  const dispatch = useAppDispatch()
  // const auth = useSelector(authReducer)
  const isAuth = useSelector((state: RootState) => state.auth.isAuth)
  const userData = useSelector((state: RootState) => state.auth.data)
  console.log(userData)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues(prevValues => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (formValues: FormValues) => {
    // event.preventDefault();
    const data = await dispatch(fetchAuth({email:formValues.email, password:formValues.password}))
    // console.log(data)
    // console.log(1)
    console.log(isAuth)
    console.log(userData)
    if (!data.payload) {
      return alert('Не удалось авторизоваться!');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
      console.log('yspeh')
    }
  };
  


if (isAuth) {
  return <Navigate to="/MyProfile" />;
}

  return (
    <div>
     <h1>Профиль</h1> 
    </div>
  );
};

export default MyProfile;