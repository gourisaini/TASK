import axios from '@/utils/axios';
import React, { useContext, useState } from 'react'
import { AccountContext } from '@/context/AccountProvider';
import { useRouter } from 'next/router';


const AddUser = ({ isShow, setIshow }) => {
    const router  = useRouter();

    const { setUser } = useContext(AccountContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        const userObject = {
            email, password
        };
        try {
            const response = await axios.post('/login', userObject);
            setUser(response.data);
            router.push('/Profile');
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    return (
        <div className='w-25 pe-5 border-end'>
            <h1 className='mb-5 fw-light'>User Login</h1>
            <form onSubmit={submitHandler}>
                <input className='mb-3 w-100 form-control' type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
                <input className='mb-3 w-100 form-control' type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                <button className='w-100 mb-3 btn btn-dark'>Login</button>
            </form>
            <p>Doesn't have an account <a className='link' onClick={e => setIshow(!isShow)}>click here</a></p>
        </div>
    )
}

export default AddUser;