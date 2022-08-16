import { defineStore } from 'pinia';
import { PYCKSubmissionObject, PYCKResultObject, AxiosResultResponse } from '../types/interfaces';
import axios from 'axios';

export const usePYCKStore = defineStore('pyckStore', {
    state: () => {
        return {
            resultMap: new Map([
                ['Sequence Data (.fasta, .phy)', {} as PYCKResultObject],
                ['Distance Matrix (.dst, .csv)', {} as PYCKResultObject],
                ['Data Matrix (.csv)', {} as PYCKResultObject],
            ]) as Map<string, PYCKResultObject>,
        }
    },
    getters: {
        getResult: (state) => state.resultMap,
    },
    actions: {
        async fetchResult(submission: PYCKSubmissionObject) {
            const sub = { submission: submission }
            try {
                const { data }: AxiosResultResponse = await axios.get('/api/calculation', { params: sub })
                this.resultMap.set(data.info.algorithm, data)
            } catch (error) {
                console.log(error)
            }
        },
        clearResults(algorithm: string) {
            let mapReset = false
            this.resultMap.forEach((element, index) => {
                if (index == algorithm) {
                    mapReset = true
                }
                if (mapReset) {
                    this.resultMap.set(index, {} as PYCKResultObject)
                }
            })
        },
    },
})