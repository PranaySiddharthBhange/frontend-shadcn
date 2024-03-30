import React, { useState ,useContext} from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
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
import { AuthContext } from './authprovider';

function Login() {
  const { toast } = useToast();

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
     
      if (!email || !password) {

        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Email and Password Required",
  
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        return;
    }
      
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email: email,
        password: password
      });
  
      console.log('Login successful');
      console.log('Response:', response.data);
  
      const token = response.data.token;
      login(token);
  
      navigate("/");

  
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        
        // description: `${error}`,

        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };
  

  return (
    <div className='flex items-center justify-center h-screen w-screen'>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Welcome back to Swasthya</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
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
          <Button onClick={handleLogin}>Login</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
