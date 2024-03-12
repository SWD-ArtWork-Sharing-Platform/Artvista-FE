import { PackageOfCreatorDTO } from "./PackageOfCreatorDTO";

export interface PackageDTO {
    packageId?: string;
    packageName?: string;
    maximumArtworks?: number;
    price?: number;
    discount?: number;
    packageOfCreatorDTOs?: PackageOfCreatorDTO[];
}