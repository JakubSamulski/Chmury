import { jwtDecode } from "jwt-decode";
import axios from 'axios';


function getUsername() {
    const decoded  = jwtDecode(window.localStorage.getItem("access_token"));
    return decoded["username"];
}
function isTokenExpired() {
    const decodedToken = jwtDecode(window.localStorage.getItem("access_token"));
    const currentTime = Math.floor(Date.now() / 1000); // W sekundach
    return decodedToken.exp < currentTime;
}
async function refreshToken(){
    const url ="https://tictactoekuba.auth.us-east-1.amazoncognito.com/oauth2/token"
    const client_id = import.meta.env.VITE_CLIENT_ID;
    const client_secret = import.meta.env.VITE_CLIENT_SECRET;

    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(client_id + ":" + client_secret),
    };
    const data = {
        grant_type: "refresh_token",
        client_id: client_id,
        refresh_token: window.localStorage.getItem("refresh_token"),
    };
    try {
        const tokens =  await postData(url, data, headers);
        window.localStorage.setItem("access_token", tokens.access_token);
        window.localStorage.setItem("id_token", tokens.id_token);
        return tokens;
    } catch (error) {
        console.error(error);

    }
}

async function postData(url, data, headers) {
    try {
        const response = await axios.post(url, data, { headers: headers });

        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export { getUsername, isTokenExpired ,refreshToken};