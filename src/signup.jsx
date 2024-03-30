import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import axios from 'axios';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignup = () => {
    axios.post('http://localhost:5000/api/users/', {
      name: name,
      email: email,
      password: password
    })
    .then(response => {
      console.log('Signup successful');
      console.log('Response:', response.data); 

      const token = response.data.token;
      localStorage.setItem('token', token);

      
    })
    .catch(error => {
      console.error('Error occurred during signup:', error);
    });
  };

  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Signup</CardTitle>
          <CardDescription>Create an account for Swasthya</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name" value={name} onChange={handleNameChange} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Email" value={email} onChange={handleEmailChange} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleSignup}>Signup</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Signup;
