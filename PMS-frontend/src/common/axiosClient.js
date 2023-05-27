import axios from "axios";
import { retrieveCache } from "./helpers";
import { BACKEND_URL } from "./constants";

const request = async (config, jwt) => {
    if(jwt === undefined)
        jwt = retrieveCache('jwt');
    try{
        const res = await axios.request({
            baseURL: BACKEND_URL,
            headers:{
                "Authorization":`${jwt}`
            },
            ...config
        })
        return res.data;
    }
    catch(error){
        throw error.response ? error.response.data.error : error.message;
    }
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

export const getBookingsApi = async (parkingAreaId, startTime, endTime) => {
    return await request({
        method: "GET",
        url: `/bookings/${parkingAreaId}/${startTime}/${endTime}`,
    })
}

export const bookSlotApi = async (params) => {
    return await request({
        method: "POST",
        url: "/bookings",
        data: params
    });
}