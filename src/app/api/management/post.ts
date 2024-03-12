import axiosInstances from "@/utils/axios";

const requestManagement = axiosInstances.management
const ROOT_POST= "/post"

const getAllPost = () => requestManagement.get(`${ROOT_POST}/GetAllPost`)

const postManagementApi = {
    getAllPost
};
  
export default postManagementApi;