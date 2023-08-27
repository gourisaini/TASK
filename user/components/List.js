import React, { useContext, useEffect, useState } from 'react'
import { AccountContext } from '@/context/AccountProvider';


const List = () => {
    const { list, setList } = useContext(AccountContext);

    useEffect(() => {

        const fetchList = async () => {
            const response = await fetch("http://localhost:8080/userList")
            const json = await response.json();
            setList(json);
        }
        fetchList();
    }, []);

    return (
        <div className='w-75'>
            <h1 className='text-center fw-light mb-3'>List of all registered User</h1>
            <ol className='w-75 m-auto list-group'>
                {list && list.map((l) => (
                    <li key={l._id} className='list-group-item d-flex align-items-baseline justify-content-between mb-1'>
                        {l.name}
                    </li>
                ))}
            </ol>
        </div>
    )
}

export default List;