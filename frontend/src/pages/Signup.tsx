import { Box , Button, Typography} from '@mui/material'
import CustomizedInput from '../components/shared/CustomizedInput';
import { CiLogin } from "react-icons/ci";
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
const navigate = useNavigate();
const auth = useAuth();
const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    toast.loading("Signing Up", {id:'login'});
    await auth?.signup(name, email, password);
    toast.success("Signed Up Successfully", {id: 'login'});
  } catch (error) {
    console.log(error);
    toast.error("Signing Up Failed.", {id: 'login'});
  }
};
useEffect(()=>{
  if(auth?.user){
    return navigate("/chat");
  }
}, [auth]);
  return (
    <Box width={"100%"} height={"100%"} display={"flex"} flex={1}>
      <Box padding={1} mt={1} display={{md:"flex", sm:"none", xs:"none"}}>
      <img className='form-pic' src="laptop.jpg" alt="front-page" style={{width:"600px"}} />
      </Box>
      <Box display={'flex'} flex={{ xs: 1, md: 0.5}} justifyContent={'center'} alignItems={'center'} padding={2} ml={'auto'}>
        <form onSubmit={handleSubmit} style={{margin: 'auto', padding: '30px', boxShadow: '5px 5px 10px #808080', borderRadius: '10px', border: 'none'}}>
          <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center"} }>
            <Typography variant='h4' textAlign="center"  padding={1} fontWeight={500}>Signup</Typography>
            <CustomizedInput type="text" name="name" label="Name"/>
            <CustomizedInput type="email" name="email" label="Email"/>
            <CustomizedInput type="password" name="password" label="Password"/>
            <Button type="submit" 
            endIcon= {<CiLogin/>}
            sx={{px:2, py:1, mt:2, width:"400px", borderRadius:2, bgcolor:"white", color: "black", 
            ":hover":{
              bgcolor: "#808080",
              color: "black"
            }}
            }>Signup</Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;