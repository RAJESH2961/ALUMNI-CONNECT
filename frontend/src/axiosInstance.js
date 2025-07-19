import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_BASE_API

const axiosInstance = axios.create({
    // BASE URL
    baseURL: baseURL,
    headers: {
        'Content-Type' : 'application/json',
    }
})


// Request Interceptor 
axiosInstance.interceptors.request.use(
    function(config){
        // console.log('request without auth header==>', config);
        const accessToken = localStorage.getItem('AccessToken')
        if(accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`// Injecting access Token
        }
        return config;
    }, function(error) {
        return Promise.reject(error);
    }
)

// Response Interceptor 
axiosInstance.interceptors.response.use(
    function(response){
        return response;
    }, 
    // Handle Failes responses
    async function (error) {
        const originalRequest = error.config;
        // If the response is 401 then the token has expired we need to get the new access token
        if(error.response.status == 401 && !originalRequest.retry) {
            originalRequest.retry = true;
            // getting refresh token from local storage
            const refreshToken = localStorage.getItem("RefreshToken")
            try{
                // send api request to referesh token
                const response = await axiosInstance.post('/token/refresh/', {
                    refresh: refreshToken
                })
            // console.log("New Access token", response.data);
            // we got access token as response so we need to setup to local storage
            localStorage.setItem('AccessToken', response.data.access)
            // setting new data to the Authorization
            originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`
            // sending again request to ensure user is logged in
            return axiosInstance(originalRequest);
            }catch(error){
                // return false;
                // ? In case if we set timer for refresh token to 1 days it gonna expire in that scenation we need to clear all the daata from llocal storaage
                localStorage.removeItem('AccessToken')
                localStorage.removeItem('RefreshToken')
                window.location.href = '/login'
            }
        }
        return Promise.reject(error);
    }
)

export default axiosInstance;