import axios from "axios";
import {MyProfileType} from "../State/Profile-reducer";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {"API-KEY": "f9c3a575-0b00-4c6c-8132-1404a6abde77"}
})

export const UsersAPI = {
    getUser(currentPage: number = 1, pageSize: number= 10){
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow (id: number){
        return instance.post(`follow/${id}`)
            .then(response => response.data)
            .then(data => data.resultCode)
    },
    unFollow (id: number){
        return instance.delete(`follow/${id}`)
            .then(response => response.data)
            .then(data => data.resultCode)
    },
    getFriends (status: boolean = true){
        return instance.get(`users?friend=${status}`)
            .then(response => response.data)
    },
    findUser (userName: string){
        return instance.get(`users?term=${userName}`)
            .then(response => response.data)
    },
    startChat (userId: string){
        return instance.put(`dialogs/${userId}`)
            .then(response => response.data)
    },
    sendMessage (userId: string){
      return instance.post(`dialogs/${userId}/messages`, {body: 'hello friend'})
          .then(response => response.data)
    }
}


export const ProfileAPI = {
    getProfile(userId: string | number){
        return instance.get(`profile/${userId}`)
            .then(response => response.data)
            .catch(error => alert(error))
    },
    getStatus(userId: string | number){
        return instance.get('/profile/status/' + userId)
    },
    updateStatus(status: string | null){
        return instance.put('/profile/status/', {status})
    },
    getUserFollow(userId: string){
        return instance.get(`follow/${userId}`)
    },
    updateProfile(profile: MyProfileType){
        return instance.put('/profile', profile)
            .then(response => response.data)
    },
    updatePhoto(photo: string | null){
        return instance.put('/profile/photo', {image: photo})
    }
}


export const AuthAPI = {
    authMe (){
        return instance.get(`auth/me`)
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean = false){
        return instance.post(`/auth/login`, {email, password, rememberMe})
            .then(res => res.data)
    },
    logout(){
        return instance.delete(`/auth/login`)
            .then(res => res.data)
    }
}