import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Signup() {
let navigate = useNavigate()
  let handleSubmit= async(e)=>{
e.preventDefault()


let data = {
  name:e.target.name.value,
  email:e.target.email.value,
  password:e.target.password.value
}

try {
  let res = await axios.post(`${process.env.REACT_APP_API_URL}/user/signup`,data)
if (res.status===200){
  toast.success(res.data.message)
  navigate ('/signin')
}

} catch (error) {

   toast.error(error.response.data.message)
}


}


  return <div className='container-fluid'>
<div>
    <Form onSubmit={handleSubmit} >
    <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" name="name"/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password"/>
      </Form.Group>
      <Button variant="primary" type="submit">
       Submit
      </Button>
    </Form>
    </div>

  </div>

}

export default Signup
