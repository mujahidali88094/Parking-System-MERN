import axios from "axios";
import { retrieveCache } from "./helpers";
import { BACKEND_URL } from "./constants";

const request = async (config, jwt) => {
    if(jwt === undefined)
        jwt = retrieveCache('jwt');
    // try{
        const res = await axios.request({
            baseURL: BACKEND_URL,
            headers:{
                "Authorization":`Bearer ${jwt}`
            },
            ...config
        })
    return res;
    //     return {
    //         errorOccurred: false,
    //         data: res.data
    //     }
    // }
    // catch(err){
    //     return {
    //         errorOccurred: true,
    //         data: err.response ? err.response.data.message : err.message
    //     }
    // }
    
}


export const signupApi = async (params)=>{
    return await request({
        method:"POST",
        url: "/signup",
        data: params
    })
}
export const loginApi = async (params)=>{
    return await request({
        method:"POST",
        url: "/login",
        data: params
    })
}

export const getAllParkingAreasApi = async () => {
    return await request({
        method: "GET",
        url: "/parking-areas"
    })
}
