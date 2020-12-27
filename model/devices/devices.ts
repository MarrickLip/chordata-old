import { FileListFilter } from "./filters";
import { FileListGuard } from "./guards";
import { AudioMothDevice } from './audiomoth';

export type WebkitFile = File & {webkitRelativePath: string};

export type Device = {
    id: string;
    meta: {
        name: string,
        icon: string,
    },
    guards: {
        errors: Array<[FileListGuard, string]>,
        warnings: Array<[FileListGuard, string]>,
    }
    filters: FileListFilter[]
}

export const devices = [
    AudioMothDevice,
]