"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// TODO: redirect to current date 
export default function Home() {
  const { push } = useRouter();


  let date = new Date;

  let dateFormat = getDateFormat(date);

  useEffect(() => {
     push('/todo/' + dateFormat);
  }, []);

  function getDateFormat(inDate: Date)
  {
    let day = inDate.getDate(); 
    let month = inDate.getMonth() + 1; 
    let year = inDate.getFullYear(); 

    return `${month}-${day}-${year}`;
  }


  return (
    <div>
    </div>
  );
}
