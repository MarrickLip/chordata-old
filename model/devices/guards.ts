import { WebkitFile } from "./devices";

export type FileListGuard = (files: FileList) => boolean;

const getPaths = (files: FileList) => (
    Array.from(files).map(
        file => (file as WebkitFile).webkitRelativePath
    )
);

export const MustBeDirectory: FileListGuard = (files: FileList) => (
    Array.from(files).every(path => !!path)
);

export const MustNotBeEmpty: FileListGuard = (files: FileList) => files.length > 0;

export const AllPathsMatch = 0;

export const NoPathsMatch = 0;