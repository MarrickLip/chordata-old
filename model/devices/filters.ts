import { WebkitFile } from './devices'

export type FileListFilter = (files: FileList) => File[]

const IncludePathPattern = (pattern: RegExp) => (files: FileList) =>
    Array.from(files).filter((file) => {
        const path = (file as WebkitFile).webkitRelativePath
        return pattern.test(path)
    })
