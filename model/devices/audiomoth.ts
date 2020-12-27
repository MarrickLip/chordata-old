import { Device } from "./devices";
import { MustBeDirectory, MustNotBeEmpty } from "./guards";

export const AudioMothDevice: Device = {
    id: 'audio-moth',
    meta: {
        name: 'Audio Moth',
        icon: 'fas fa-microphone',
    },
    guards: {
        errors: [
            [MustBeDirectory, 'You must select a directory (folder)'],
            [MustNotBeEmpty, 'The selected directory is empty'],
        ],
        warnings: [],
    },
    filters: [],
}