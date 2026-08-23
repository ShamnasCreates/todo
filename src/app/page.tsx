"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// TODO: redirect to current date 
export default function Home() {
  const { push } = useRouter();


  let date = new Date;

  let dateFormat = date.toLocaleDateString().replaceAll("/", "-");

  useEffect(() => {
     push('/todo/' + dateFormat);
  }, []);


  return (
    <div>
    </div>
  );
}
