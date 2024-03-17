import axiosInstances from "@/config/axios";

const requestManagement = axiosInstances.management
const ROOT_ARTWORK = "/artwork"

const getAllArtwork = () => requestManagement.get(`${ROOT_ARTWORK}/GetAllArtwork`)

const getAllArtworkDetail = (artworkId: string) => requestManagement.get(`${ROOT_ARTWORK}/GetArtworkByID`, { params : { id : artworkId} })

const createNewArtwork = (artworkId: string,
artworkName: string,
price: number,
discount: number = 0,
status: string,
id: string,
categoryId: string,
imageUrl: string,
imageLocalPath: string,
image: File | null,
postDTOs: any = null,
reportDTOs: any = null) => requestManagement.post(`${ROOT_ARTWORK}/CreateNewArtwork`, {
    artworkId,
    artworkName,
    price,
    discount,
    status,
    id,
    categoryId,
    imageUrl,
    imageLocalPath,
    image,
    postDTOs,
    reportDTOs
})

const artworkManagementApi = {
    getAllArtwork,
    getAllArtworkDetail,
    createNewArtwork
};
  
export default artworkManagementApi;