import axios from "axios";
import Vue from "vue";
import VueAxios from "vue-axios";
// const token = localStorage.getItem("token");
// const token_type = localStorage.getItem("token_type");
// axios.defaults.headers.common['Authorization'] = token_type + " " +token;
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';;
// axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*'
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Content-Type'] = 'pplication/json';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';



Vue.use(VueAxios, axios)
export default axios.create({
    baseURL: "http://192.168.1.103:3000/auth/",
    withCredentials: false,
    headers: {
        "Content-type": "application/json" ,
        'Access-Control-Allow-Credentials':true,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
    }
});