import { AppBar, Toolbar } from "@mui/material";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";

const Header = () => {
    const auth = useAuth();
    return (
        <AppBar sx={{bgcolor: "transparent", position: "static", boxShadow: "none"}}>
            <Toolbar sx={{display: "flex"}}>
                <Logo />
                <div>
                    {auth?.isLoggedIn? (<>
                        <NavigationLink bg="white
                        " to="/chat" text="Go To Chat" textColor="black"/>
                        <NavigationLink bg="white" textColor="black" to="/" text="logout" onClick={auth.logout}/>
                    </>) : (<>
                        <NavigationLink bg="white" to="/login" text="Login" textColor="black" />
                        <NavigationLink bg="white" textColor="black" to="/signup" text="Signup" />
                    </>)}
                </div>           
            </Toolbar>
        </AppBar>
    );  
};

export default Header;