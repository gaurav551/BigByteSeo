import React from 'react'
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';


const NotFound = () => {

    return (
        <Result
        status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="link"> <Link to='/'>Back Home</Link> </Button>}
      />
    )
}
export default NotFound
