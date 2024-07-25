import { Typography,Avatar, Box, Button, IconButton } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import ChatItem from '../components/chat/ChatItem';
import { IoMdSend } from 'react-icons/io';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { deleteUserChats, getUserChats, sendChatRequest } from '../helpers/api-communicator';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type Message = {
  role: "user" | "assistant",
  content: string,
};

export const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMesseges, setChatMessages] = useState<Message[]>([]);
  const handlesubmit = async () => {
    const content = inputRef.current?.value as string;
    if(inputRef && inputRef.current){
      inputRef.current.value = "";
    }
    const newMessage: Message = {role:"user", content};
    setChatMessages((prev)=>[...prev, newMessage]);
    //
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", {id: "deletechats"});
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Chats deleted succesfully", {id: "deletechats"});
    } catch (error) {
      console.log(error);
      toast.error("Deleting Chats failed", {id: "deletechats"});
    } 
  };

  useLayoutEffect(()=>{
    if(auth?.isLoggedIn && auth.user){
      toast.loading("Loading chats",  {id: "loadchats"});
      getUserChats().then((data)=>{
          setChatMessages([...data.chats]);
          toast.success("Succesfully loaded Chats", {id: "loadchats"})
      }).catch(err => {
        console.log(err);
        toast.error("Loading Failed", {id:"loadchats"})
      });
    }
  }, [auth]);

  useEffect(()=> {
    if(!auth?.user)
      return navigate("/login");
  }, [auth])

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
        <Button onClick={handleDeleteChats} sx={{width: "200px", my: "auto", color: "black", fontWight: "700", borderRadius: 3, mx: "auto", bgcolor: "white", ":hover": { bgcolor: "#808080"}}}>
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
          //@ts-ignore 
          <ChatItem content={chat.content} role= {chat.role} key={index}/>

        ))}
    </Box>
    <div style={{width: "100%", padding: "20px", borderRadius: 8, backgroundColor: "black", display: "flex", margin: "auto"}}>
    {" "}
    <input ref={inputRef} type="text" style={{width: "100%", backgroundColor:"transparent", padding: '10px', border: "none", outline: "none" , color: "white", fontSize: "20px"}} />
    <IconButton onClick={handlesubmit}  sx={{ml: "auto", color: "white"}}>
      <IoMdSend/>
    </IconButton>
    </div>
    
   </Box>
  </Box>
  )
};

export default Chat;