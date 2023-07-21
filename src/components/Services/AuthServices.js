import axios from "axios";
const API_URL = "http://localhost:8080/api/";

/*const register = (username,email,password)=>{
    return axios.post(API_URL+"register",{
        username,
        email,
        password
    })
}*/
const login = async (username, password) => {
    const res = await axios.post(API_URL + "login", {
        username,
        password
    })
        .then((res) => {
            if (res.data.token && res.status == 200) {
                localStorage.setItem("user", JSON.stringify(res.data))
            }
            console.log(res.data);
        })


}
const register = async (username, password, email) => {
    const res = await axios.post(API_URL + "register", {
        username,
        password,
        email
    })
    return res;
}


const logout = () => {
    axios.get(API_URL + 'logout')
        .then((res) => {
            console.log('logged out')
        })
    localStorage.removeItem("user");
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}
const AuthServices = {
    // register,
    login,
    logout,
    getCurrentUser,
    register
}

export default AuthServices;
