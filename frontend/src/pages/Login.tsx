import { Box , Button, Typography} from '@mui/material'
import CustomizedInput from '../components/shared/CustomizedInput';
import { CiLogin } from "react-icons/ci";
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
const navigate = useNavigate();
const auth = useAuth();
const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    toast.loading("Signing In", {id:'login'});
    await auth?.login(email, password);
    toast.success("Signed In Successfully", {id: 'login'});
  } catch (error) {
    console.log(error);
    toast.error("Signing In Failed.", {id: 'login'});
  }
};
useEffect(()=>{
  if(auth?.user){
    return navigate("/chat");
  }
}, [auth]);
  return (
    <Box width={"95%"} height={"100%"} display={"flex"} flex={1}>
      <Box padding={1} mt={1} display={{md:"flex", sm:"none", xs:"none"}}>
      <img className='form-pic' src="laptop.jpg" alt="front-page" style={{width:"600px"}} />
      </Box>
      <Box display={'flex'} flex={{ xs: 1, md: 0.5}} justifyContent={'center'} alignItems={'center'} padding={2} ml={'auto'}>
        <form onSubmit={handleSubmit} style={{margin: 'auto', padding: '30px', boxShadow: '#808080', borderRadius: '10px', border: 'none'}}>
          <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center"} }>
            <Typography variant='h4' textAlign="center"  padding={2} fontWeight={500}>Login</Typography>
            <CustomizedInput type="email" name="email" label="Email"/>
            <CustomizedInput type="password" name="password" label="Password"/>
            <Button type="submit" 
            endIcon= {<CiLogin/>}
            sx={{px:2, py:1, mt:2, width:"400px", borderRadius:2, bgcolor:"white", color: "black", 
            ":hover":{
              bgcolor: "#808080",
              color: "black"
            }}
            }>Login</Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;