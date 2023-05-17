import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useContext } from 'react'
import { useState } from 'react'
import NewUsersContext from '../../contexts/NewUserContext'
import { useNavigate } from 'react-router-dom'
import { v4 as generatedId } from 'uuid'
import styled from 'styled-components'
import UsersContext from '../../contexts/UsersContext'

const StyledMain = styled.main`
background-color: #F3CC9B;
text-align: center;
padding-bottom: 20px;
>h1{
    margin-top: 0px;
    padding-top: 10px;
}
>form{
    display: flex;
    gap: 1rem;
    flex-direction: column;
    align-items: center;
}
`
const SubmitButton = styled.input`
  background-color: #351F10;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  font-size: 16px;
 
`
const Register = () => {
    const { users } = useContext(UsersContext);
    const { NewUsersActionTypes, setNewUsers } = useContext(NewUsersContext);
    const navigate = useNavigate()
    const [formInputs, setFormInputs] = useState({
        userName: '',
        avatarURL: '',
        email: '',
        password: ''

    });

    const inputHandler = (e) => {
        if (e.target.type === 'number') {
            setFormInputs({
                ...formInputs,
                [e.target.name]: e.target.valueAsNumber
            });
        } else {
            setFormInputs({
                ...formInputs,
                [e.target.name]: e.target.value
            });
        }
    }

    const formHandler = e => {
        e.preventDefault();
        const newUser = {
            ...formInputs,
            id: generatedId()
        };
        setNewUsers({
            type: NewUsersActionTypes.add,
            data: newUser
        })

        navigate('/dogs')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        formik.handleSubmit();
        formHandler(e);
    }

    const handleChange = (e) => {
        formik.handleChange(e);
        inputHandler(e);
    }

    const values = {

        userName: '',
        avatarURL: '',
        email: '',
        password: ''
    }

    const validationSchema = Yup.object({

        userName: Yup.string()
            .min(3, 'Name must be at least 3 symbols')
            .max(15, 'Name must be less than 15 symbols')
            .required('You must fill this field'),
        avatarURL: Yup.string()
            .url('Please write avatar url corectly'),
        email: Yup.string()
            .email('Please write your real email adress')
            .test('unique', 'This email is already taken', function (value) {
                return new Promise(resolve => {
                    const isUnique = !users.find(user => user.email === value);
                    resolve(isUnique);
                });
            })
            .required('You must fill this field'),
        password: Yup.string()
            .matches(
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
            )
            .required('You must fill this field'),
        passwordConfirm: Yup.mixed()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('You must fill this field'),

    })
    const formik = useFormik({
        initialValues: values,
        validationSchema: validationSchema,
        onSubmit: (values) => { console.log(values) }
    })
    return (
        <StyledMain>
            <h1>Create New Account</h1>
            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor='userName'>User Name:</label>
                    <input
                        type='text'
                        name='userName' id='userName'
                        value={formik.values.userName}
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {
                        formik.touched.userName && formik.errors.userName &&
                        <span style={{ color: 'red' }}
                        >{formik.errors.userName}</span>
                    }
                </div>

                <div>
                    <label htmlFor='avatarURL'>Avatar URL:</label>
                    <input
                        type='text'
                        name='avatarURL' id='avatarURL'
                        value={formik.values.avatarURL}
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {
                        formik.touched.avatarURL && formik.errors.avatarURL &&
                        <span style={{ color: 'red' }}
                        >{formik.errors.avatarURL}</span>
                    }
                </div>
                <div>
                    <label htmlFor='email'>Email adress:</label>
                    <input
                        type='email'
                        name='email' id='email'
                        value={formik.values.email}
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {
                        formik.touched.email && formik.errors.email &&
                        <span style={{ color: 'red' }}
                        >{formik.errors.email}</span>
                    }
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input
                        type='password'
                        name='password' id='password'
                        value={formik.values.password}
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {
                        formik.touched.password && formik.errors.password &&
                        <span style={{ color: 'red' }}
                        >{formik.errors.password}</span>
                    }
                </div>
                <div>
                    <label htmlFor='passwordConfirm'>Repeat the password:</label>
                    <input
                        type='password'
                        name='passwordConfirm' id='passwordConfirm'
                        value={formik.values.passwordConfirm}
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {
                        formik.touched.passwordConfirm && formik.errors.passwordConfirm &&
                        <span style={{ color: 'red' }}
                        >{formik.errors.passwordConfirm}</span>
                    }
                </div>
                <SubmitButton type='submit' value='Register' />
            </form>
        </StyledMain>
    );
}

export default Register;