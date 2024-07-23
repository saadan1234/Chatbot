import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Logo() { 
  return (
    <div style={{display: "flex", marginRight: "auto", alignItems: "center", gap: "8px"}}>
        <Link to={"/"}>
          <img src="/logo.png" alt="robot-logo" width={'60px'}/>
        </Link>
        <Typography sx={{display: {md:"block", sm:"none", xs: "none"}, mr: "auto", fontWeight: "800", textShadow: "2px 2px 20px #000"}}>
          <span style={{fontSize: "25px"}}>
            MINI
          </span>-GPT
        </Typography>
    </div>
  );
};

export default Logo;