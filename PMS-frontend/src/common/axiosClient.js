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

export const getNearbyParkingAreasApi = async (radius, lat, lng) => {
    return await request({
        method: "GET",
        url: `/parking-areas?radius=${radius}&lat=${lat}&lng=${lng}`
    });
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

export const createParkingAreaApi = async (params) => {
    return await request({
        method: "POST",
        url: "/parking-areas",
        data: params
    });
}

export const updateParkingAreaApi = async (params) => {
    return await request({
        method: "PUT",
        url: "/parking-areas/"+params._id,
        data: params
    });
}

export const deleteParkingAreaApi = async (id) => {
    return await request({
        method: "DELETE",
        url: "/parking-areas/"+id,
    });
}
