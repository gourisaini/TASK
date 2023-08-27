import { AccountContext } from '@/context/AccountProvider';
import axios from '@/utils/axios';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'

const Profile = ({ }) => {
    const { user, setUser } = useContext(AccountContext);

    const [name, setName] = useState('');
    const [dob, setDOB] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');

    const userObject = {
        name,
        dob,
        contact,
        email
    }

    const router = useRouter()

    const DeleteHandler = async (e) => {
        axios.get(`/delete/${user._id}`)
            .then((res) => {
                router.push("/");
            }).catch((error) => {
                console.log(error)
            });
    }

    const EditHandler = async (e) => {
        axios.post(`/update/${user._id}`,userObject)
            .then((res) => {
                router.push("/Profile");
                console.log("User Edited");
            }).catch((error) => {
                alert(error);
            });
    }

    const SignOutHandler = async (e) => {
        axios.get('/signout')
            .then((res) => {
                router.push('/');
            }).catch((error) => {
                alert(error);
            });
    }


    const currentuser = async () => {
        try {
            const { data } = await axios.get("/currentUser");
            setUser(data.user)
            setName(data.user.name);
            setDOB(data.user.dob);
            setContact(data.user.contact);
            setEmail(data.user.email);
        } catch (error) {
            console.log(error);
            router.push("/")
        }
    }

    useEffect(() => {
        currentuser()
    }, [])

    return (
        <div className='container mt-5 p-5 bg-light'>
            <h1 className='text-center mb-3 fw-light'>Profile Details</h1>
            <p className='text-center mb-5'>Click to change the values</p>
            <form>
                <div className='m-auto mb-1 w-50 bg-secondary text-white px-3 py-1 fw-bold'>Name - {user.name}</div>
                <input className='m-auto mb-3 w-50 form-control' type="text" value={name} onChange={e => setName(e.target.value)} />

                <div className='m-auto mb-1 w-50 bg-secondary text-white px-3 py-1 fw-bold'>Date of Birth - {user.dob}</div>
                <input className='m-auto mb-3 w-50  mb-3 form-control' type="date" value={dob} onChange={e => setDOB(e.target.value)} />

                <div className='m-auto mb-1 w-50 bg-secondary text-white px-3 py-1 fw-bold'>Contact - {user.contact}</div>
                <input className='m-auto mb-3 w-50  mb-3  form-control' type="text" value={contact} onChange={e => setContact(e.target.value)} />

                <div className='m-auto mb-1 w-50 bg-secondary text-white px-3 py-1 fw-bold'>Email - {user.email}</div>
                <input className='m-auto mb-5 w-50 form-control' type="email" value={email} onChange={e => setEmail(e.target.value)} />

                <div className='m-auto mb-3 w-50 px-5 d-flex justify-content-between'>
                    <button onClick={EditHandler} className='btn btn-dark'>Update</button>
                    <button onClick={DeleteHandler} className='btn btn-dark'>Delete</button>
                    <button onClick={SignOutHandler} className='btn btn-dark'>SignOut</button>
                </div>
            </form>
        </div>
    )
}

export default Profile;