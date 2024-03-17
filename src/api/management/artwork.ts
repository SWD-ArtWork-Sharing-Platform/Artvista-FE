import axiosInstances from "@/config/axios";

const requestManagement = axiosInstances.management
const ROOT_ARTWORK = "/artwork"

const getAllArtwork = () => requestManagement.get(`${ROOT_ARTWORK}/GetAllArtwork`)

const getAllArtworkDetail = (artworkId: string) => requestManagement.get(`${ROOT_ARTWORK}/GetArtworkByID`, { params : { id : artworkId} })

const artworkManagementApi = {
    getAllArtwork
};
  
export default artworkManagementApi;