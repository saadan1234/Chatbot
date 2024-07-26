import { Typography, Avatar, Box } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism';

function extractCodeFromString(message: string) {
    if(message.includes("```")){
        const blocks = message.split("```");
        return blocks;
    }
};

function isCodeBlock(str: string){
    if(
        str.includes("=") || 
        str.includes(";") || 
        str.includes("[") ||
        str.includes("]") || 
        str.includes("{") ||
        str.includes("}") ||
        str.includes("#") ||
        str.includes("//") ||
        str.includes("$")
    ){
        return true;
    }
    return false;
}



const ChatItem = ({content, role}: {content: string, role: "user" | "assistant"}) => {
    const messageBlocks = extractCodeFromString(content);
    const auth = useAuth();
    return role === "assistant" ? 
    <Box sx={{borderRadius: 3, display: "flex", p:2, bgcolor: "#c0c0c0", my: 2, gap: 2, alignItems: "center"}}>
        <Avatar sx={{ml: "0", }}>
            <img src="openai.png" alt="openai" width={"30px"}/>
        </Avatar>
        <Box>
            
        {!messageBlocks && <Typography sx={{fontSize: "20px"}}>{content}</Typography>}
        {messageBlocks && messageBlocks.length && messageBlocks.map((block)=> (isCodeBlock(block) ? <SyntaxHighlighter  style={coldarkCold} language="javascript" >
            {block}
        </SyntaxHighlighter> : <Typography sx={{fontSize: "20px"}}>{block}</Typography> )) }
        </Box>
    </Box> : <Box sx={{borderRadius: 3,display: "flex", p:2, bgcolor: "black", my: 2, gap: 2, alignItems: "center"}}>
        <Avatar sx={{ml: "0", bgcolor: "white", color: "black"}}>
            {auth?.user?.name[0]}
        </Avatar>
        <Box>
            
        {!messageBlocks && <Typography sx={{fontSize: "20px"}}>{content}</Typography>}
        {messageBlocks && messageBlocks.length && messageBlocks.map((block)=> (isCodeBlock(block) ? <SyntaxHighlighter  style={coldarkCold} language="javascript" >
            {block}
        </SyntaxHighlighter> : <Typography sx={{fontSize: "20px"}}>{block}</Typography> )) }
        </Box>
    </Box>
};

export default ChatItem