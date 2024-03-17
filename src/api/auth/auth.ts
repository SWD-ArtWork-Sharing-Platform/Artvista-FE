import axiosInstances from "@/config/axios";

const requestAuth = axiosInstances.auth
const ROOT_AUTH ="/auth"

const updateAccount = (id: string,
    name: string,
    phoneNumber: string,
    address: string) => requestAuth.put(`${ROOT_AUTH}/UpdateAccount`, {id: id,
        name: name,
        phoneNumber: phoneNumber,
        address: address})

const authApi = {
    updateAccount
};
  
export default authApi;