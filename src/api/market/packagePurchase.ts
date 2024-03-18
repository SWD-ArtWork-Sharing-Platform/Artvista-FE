import axiosInstances from "@/config/axios";

const requestMarket = axiosInstances.market
const ROOT_PACKAGE_PURCHASE_MARKET = "/packagePurchase"

const getAllAvailablePackage  = () => requestMarket.get(`${ROOT_PACKAGE_PURCHASE_MARKET}/GetAllAvailablePackage`)

const packagePurchaseMarketApi = {
    getAllAvailablePackage
};
  
export default packagePurchaseMarketApi;