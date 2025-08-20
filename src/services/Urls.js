import axios from "axios"

export const baseURL =`https://upskilling-egypt.com:3006/api/v1` 
export const baseImgURL =`https://upskilling-egypt.com:3006/` 


export const axiosInstance = axios.create({ baseURL,
   headers:{Authorization:localStorage.getItem("token")}
})

// USERS_URLS

export const USERS_URLS ={
    LOGIN: `/Users/Login` ,
    FORGET_PASSWORD: `/Users/Reset/Request` ,
    RESET_PASSWORD: `/Users/Reset` ,
    REGISTER: `/Users/Register` ,
    VERIFYACCOUNT: `/Users/verify` ,
    GETUSERS: `/Users` ,
     DELETE_USER: (id) =>`/Users/${id}` ,
}

// CATEGORIES_URLS 

export const CATEGORIES_URLS ={

 GET_ALL_CATEGORIES : `/Category` ,
 DELETE_CATEGORY: (id) =>`/Category/${id}` ,

}

// Recipes_URLS 

export const RECIPES_URLS ={
 GET_ALL_Recipes : `/Recipe` ,
 DELETE_Recipes : (id) =>`/Recipe/${id}` ,

}
// USERS_URLS 

