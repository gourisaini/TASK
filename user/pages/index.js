import React, { useEffect, useState } from 'react'
import AddUser from '@/components/AddUser';
import List from '@/components/List';
import SignUp from '@/components/SignUp';
import axios from '@/utils/axios';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter()
  const [isShow, setIsshow] = useState(false);

  const currentuser = async () => {
    try {
      const { data } = await axios.get("/currentUser");
      data && data.user && router.push("/Profile")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    currentuser()
  }, [])

  return (
    <>
      <div className='container mt-5 p-5 bg-light d-flex'>
        {!isShow ? <AddUser isShow={isShow} setIshow={setIsshow}></AddUser> : <SignUp isShow={isShow} setIshow={setIsshow}></SignUp>}
        <List></List>
      </div>
    </>
  )
}

export default Index;