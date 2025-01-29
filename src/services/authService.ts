import {ILogInForm} from "../pages";
import {apiService} from "./apiService";
import {urls} from "../constants";
import {IRes} from "../types";

type ITokenRes = {
    token:string
}

const authService = {
    login:(data:ILogInForm):IRes<ITokenRes>=>apiService.post(urls.auth.base, data)
}

export {authService}