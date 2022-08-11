import { fetch } from '@/types/public';
import type { NextPage } from 'next'
import { useEffect } from 'react';
import usePrivateApi from '@/hooks/usePrivateApi';
const Home: NextPage = () => {
  const {handleGet} = usePrivateApi();
  useEffect(() => {
    const fetch: fetch = {
      method: "GET",
      type: "external",
      data : null,
      url: "User/Index",
    };
    handleGet<boolean>(fetch , (data) => {console.log("I recive a res",data)})
  } , []);
  return (
    <div>
      شسی
    </div>
  )
}

export default Home
