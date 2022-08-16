interface AxiosFileResponse {
    data: {
        tree: FileObjectData
    }
    status: number
}

interface AxiosResultResponse {
    data: PYCKResultObject
    status: number
}
interface FileObjectMetaData {
    name: string,
    path: string,
    type: string,
}

interface FileObjectData {
    children?: this[],
    metaData?: FileObjectMetaData
}

interface FileObject {
    child: string,
    data: FileObjectData
}

interface PYCKSubmissionObject {
    filepath: string,
    algorithm: string,
    config: PYCKconfig
}
interface PYCKconfig {
    config: {
        distanceType?: string,
        missingDataAction?: string,
        correction?: string,
        eps?: number,
        proportionOfSamples?: number,
        proportionOfFeatures?: number,
    }
}

interface PYCKResultObject {
    image: string,
    info: PYCKResultInfoObject
}

interface PYCKResultInfoObject {
    algorithm: string,
    bayesian_information_criterion: number,
    davies_bouldin_index: number,
    silhouette_score: number,
    calinski_harabasz_index: number,
    cluster_membership: string
}

export { FileObjectMetaData, FileObjectData, FileObject, AxiosFileResponse, AxiosResultResponse, PYCKSubmissionObject, PYCKResultObject, PYCKconfig, PYCKResultInfoObject };