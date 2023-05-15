import { createContext } from "react";

const UserContext = createContext({
    user: {
        name: "Admin",
        email: "admininstafood@gmail.com",
        isAuthenticated: false
    }
});

UserContext.displayName = "UserContext";


export default UserContext;