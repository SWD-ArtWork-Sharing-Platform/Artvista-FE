import axiosInstances from "@/utils/axios";

const requestManagement = axiosInstances.management
const ROOT_CATEGORY = "/category"

const getAllCategory = () => requestManagement.get(`${ROOT_CATEGORY}/GetAllCategory`)

const categoryManagementApi = {
    getAllCategory
};
  
export default categoryManagementApi;