interface User {
    firstname?: string;
    lastname?: string;
    personnumber?: number;
    country?: string;
    city?: string;
    phone?: number;
    email: string;
    password: string;
}

interface Application {
    expertise1?: boolean;
    expertise2?: boolean;
    expertise3?: boolean;
    expertise4?: boolean;
}

//Example function of the login
function login(user: User){
    if(user.email && user.password){
        return true;
    } else {
        return false;
    }
}