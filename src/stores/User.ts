import { defineStore } from "pinia";

const useUserStore = defineStore('user',{
    state : () => ({
      userType : 'user',  
    }),
    actions: {
        setUserType(newUserType : string){
            this.userType = newUserType
        }
    }
})
export default useUserStore