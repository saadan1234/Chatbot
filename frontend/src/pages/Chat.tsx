import { Typography,Avatar, Box, Button, IconButton } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import ChatItem from '../components/chat/ChatItem';
import { IoMdSend } from 'react-icons/io';

const chatMesseges = [
  {
      "role": "user",
      "content": "Hi there! Can you help me with something?"
  },
  {
      "role": "assistant",
      "content": "Of course! What do you need help with?"
  },
  {
      "role": "user",
      "content": "I'm trying to understand how photosynthesis works."
  },
  {
      "role": "assistant",
      "content": "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll. It involves converting carbon dioxide and water into glucose and oxygen using sunlight."
  },
  {
      "role": "user",
      "content": "That makes sense. Can you tell me more about the role of chlorophyll?"
  },
  {
      "role": "assistant",
      "content": "Chlorophyll is a green pigment found in the chloroplasts of plants. It's crucial for photosynthesis as it absorbs light, most efficiently in the blue and red wavelengths, and converts it into chemical energy."
  },
  {
      "role": "user",
      "content": "Great, thank you! Can you also explain the difference between mitosis and meiosis?"
  },
  {
      "role": "assistant",
      "content": "Sure! Mitosis is a process where a single cell divides into two identical daughter cells, each containing the same number of chromosomes as the original cell. Meiosis, on the other hand, is a two-step division process that results in four daughter cells, each with half the number of chromosomes of the original cell. Mitosis is used for growth and repair, while meiosis is used for sexual reproduction."
  },
  {
      "role": "user",
      "content": "Thanks a lot! Can you help me with my math homework now?"
  },
  {
      "role": "assistant",
      "content": "I'd be happy to help. What math problem are you working on?"
  }
];


export const Chat = () => {
  const auth = useAuth();
  return (
   <Box sx={{display: 'flex', flex:1, width:'100%', height:'100%', mt:3, gap:3}}>
    <Box sx={{display:{md:"flex", xs:"none", sm:"none"}, flex: 0.2, flexDirection: "column"}}>
      <Box sx={{display: "flex", width:"100%", height: "60vh", bgcolor: "black", borderRadius:"white",  flexDirection: "column", mx :3}}>
        <Avatar sx={{mx: 'auto', my:2, bgcolor: "white", color: 'black', fontWeight:700}}>
          {auth?.user?.name[0]}
        </Avatar>
        <Typography sx={{mx:'auto', fontFamily: "work sans"}}>
        Hi {auth?.user?.name} ! I am MINI-GPT
        </Typography>
        <Typography sx={{mx:'auto', fontFamily: "work sans", y: 4, p: 3}}>
        Feel free to ask anything from me.
        </Typography>
        <Button sx={{width: "200px", my: "auto", color: "black", fontWight: "700", borderRadius: 3, mx: "auto", bgcolor: "white", ":hover": { bgcolor: "#808080"}}}>
        Clear Conversation
        </Button>
          
      </Box>
    </Box>
    <Box sx={{display: "flex", flex: {md: 0.8, xs: 1, sm: 1}, flexDirection: "column", px: 3}}>
      <Typography sx={{textAlign: "center", fontSize: "40px", color: "white", mb: 2, mx: "auto"}}>
        Model - GPT 3.5 Turbo
      </Typography>
      <Box sx={{width: "100%", height: "60vh", borderRadius: 3, mx: "auto", display:"flex", flexDirection: "column", overflow: "scroll", overflowX: "hidden",overflowY: "auto", scrollBehavior: "smooth"}}>
        {chatMesseges.map((chat, index)=> (
          <ChatItem content={chat.content} role= {chat.role} key={index}/>

        ))}
    </Box>
    <div style={{width: "100%", padding: "20px", borderRadius: 8, backgroundColor: "black", display: "flex", margin: "auto"}}>
    {" "}
    <input type="text" style={{width: "100%", backgroundColor:"transparent", padding: '10px', border: "none", outline: "none" , color: "white", fontSize: "20px"}} />
    <IconButton sx={{ml: "auto", color: "white"}}>
      <IoMdSend/>
    </IconButton>
    </div>
    
   </Box>
  </Box>
  )
};

export default Chat;