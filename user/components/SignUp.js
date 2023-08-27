import React, { useContext, useState } from 'react'
import axios from '@/utils/axios';
import { AccountContext } from '@/context/AccountProvider';
import { useRouter } from 'next/router';

const SignUp = ({ isShow, setIshow }) => {
    const router = useRouter();
    const { setUser } = useContext(AccountContext);
    const [name, setName] = useState('');
    const [dob, setDOB] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userObject = {
        name,
        dob,
        contact,
        email,
        password,
    }


    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/signup', userObject);
            setUser(response.data);
            router.push('/Profile');
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    return (
        <div className='w-25 pe-5 border-end'>
            <h1 className='mb-5 fw-light'>User SignUp</h1>
            <form onSubmit={submitHandler}>
                <input className='mb-3 w-100 form-control' type="text" placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
                <input className='mb-3 w-100 form-control' type="date" placeholder='Date of Birth' value={dob} onChange={e => setDOB(e.target.value)} />
                <input className='mb-3 w-100 form-control' type="text" placeholder='Number' value={contact} onChange={e => setContact(e.target.value)} />
                <input className='mb-3 w-100 form-control' type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
                <input className='mb-3 w-100 form-control' type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                <button className='w-100 mb-3 btn btn-dark'>Sign Up</button>
            </form>

            <p>Already have an account <a className='link' onClick={e => setIshow(!isShow)}>click here</a></p>
        </div>
    )
}

export default SignUp;