import {jwtDecode} from "jwt-decode";

export function checkJwt(jwt) {
    // jwt expire date/time is in seconds, Date.now() is in milliseconds
    return jwtDecode(jwt).exp * 1000 >= Date.now();
}
