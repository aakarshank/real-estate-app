class Auth {
    constructor() {
        this.authenticated = false;
    }

    login(callback) {
        this.authenticated = true;
        if (callback){
        callback()
        }
    }

    isAuthenticated(){
        return this.authenticated
    }
}

export default new Auth();
