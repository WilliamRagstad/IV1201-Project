export class User {

    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    login():boolean {
        if(this.email && this.password){//compare to database if user exists
            return true;
        } else {
            return false;
        }
    }
}

export default class FullUser extends User {
    firstname?: string;
    lastname?: string;
    personnumber?: number;
    country?: string;
    city?: string;
    phone?: number;
    constructor(firstname: string, lastname: string, personnumber: number, country:string,
        city: string, phone: number, email: string, password: string) {
            super(email, password);
            this.firstname = firstname;
            this.lastname = lastname; 
            this.personnumber = personnumber;
            this.country = country;
            this.city = city;
            this.phone = phone;
        }
    
    printName():void {
        console.log(this.firstname + " " + this.lastname);
    }

    submitUser():void {
        //connect to database and insert user
    }
}

class Application {
    expertise1?: boolean;
    expertise2?: boolean;
    expertise3?: boolean;
    expertise4?: boolean;

    constructor(expertise1: boolean, expertise2: boolean, expertise3: boolean, expertise4: boolean){
        this.expertise1 = expertise1;
        this.expertise2 = expertise2;
        this.expertise3 = expertise3;
        this.expertise4 = expertise4;
    }

    submitApplication():void {
        //connect to database and insert application
    }
}
