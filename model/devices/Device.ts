import { FileListFilter } from "./filters";
import { Filter } from "./filters";
import { FileListGuard } from "./guards";

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