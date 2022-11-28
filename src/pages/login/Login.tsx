import React, { useState } from 'react'
import { AppLayout } from 'components/Layouts'
import Headline from 'components/Headline';
import Input from 'components/InputField';


const Login = () => {
  const [isError, setIsError] = useState(false);
  
  return (
    <AppLayout>
      <Headline title='Login' />
      <Input label="Username" error={isError} />
    </AppLayout>
  )
}

export default Login