import { defineStore } from 'pinia';
import { FileObjectData, FileObject, AxiosFileResponse } from '../types/interfaces';
import { updateTree } from '../utils/tree-utils';
import axios from 'axios';

export const useFileStore = defineStore('fileStore', {
  state: () => {
    return {
      root: {} as FileObjectData,
      selectedRoot: {} as FileObjectData,
      selectedFiles: [] as FileObjectData[],
      uploadFiles: [] as FileObjectData[],
    }
  },
  getters: {
    getRoot: (state) => state.root,
    getSelectedRoot: (state) => state.selectedRoot,
    getSelectedFiles: (state) => state.selectedFiles,
    getUploadFiles: (state) => state.uploadFiles,
  },
  actions: {
    async fetchFolder(fpath: string) {
      const path = { path: fpath }
      try {
        const { data }: AxiosFileResponse = await axios.get(process.env.API + '/file', { params: path })
        console.log(data);
        const fileObjectData: FileObjectData = Object.entries(data)[0][1]
        const payload: FileObject = { child: fpath, data: fileObjectData }
        this.searchFolderAndAppend(payload)
      } catch (error) {
        console.log(error)
      }
    },
    async fetchAllFiles(selectedRoot: FileObjectData) {
      const path = { path: selectedRoot.metaData?.path }
      try {
        const { data }: AxiosFileResponse = await axios.get(process.env.API + '/file/all', { params: path })
        const fileObjectData: FileObjectData = Object.entries(data)[0][1]
        this.selectedRoot = fileObjectData
        this.selectedFiles = []
      } catch (error) {
        console.log(error)
      }

    },
    searchFolderAndAppend(payload: FileObject) {
      const tempRoot: FileObjectData = this.root
      if (Object.keys(tempRoot).length === 0) {
        this.root = payload.data
      }
      else {
        const newRoot = updateTree(tempRoot, payload.child, payload.data)
        this.root = newRoot
      }
    },
    removeSelectedFile(selectedFile: FileObjectData) {
      this.selectedFiles.forEach((file, index) => {
        if (file == selectedFile) this.selectedFiles.splice(index, 1);
      })
    },
    addSelectedFile(selectedFile: FileObjectData) {
      this.selectedFiles.push(selectedFile)
    }
  },
});
