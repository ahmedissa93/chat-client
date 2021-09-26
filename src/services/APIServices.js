import http from "../http-common";

class APIServices {
    login(data) {
        return http.post("/login", data);
    }

    register(data) {
        return http.post("/signup", data);
    }

    verifyuser() {
        return http.get("/verifyuser",{  credentials: 'include'});
    }
    setCooki() {
        return http.get("/setCooki",{  credentials: 'include'});
    }
}

export default new APIServices;