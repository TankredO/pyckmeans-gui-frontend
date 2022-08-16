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

interface FileObjectAPI{
    path:string,
    stats:FileObjectData
}
interface FileObjectMetaData {
    name: string,
    path: string,
    type: string,
    uid: number,
    gid: number,
    owner: string,
    group: string,
    size: number,
    created: Date,
    modified: Date,
    is_link: boolean,
    link_target: string|null
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

export { FileObjectMetaData, FileObjectData, FileObject, AxiosFileResponse, AxiosResultResponse, PYCKSubmissionObject, PYCKResultObject, PYCKconfig, PYCKResultInfoObject, FileObjectAPI };