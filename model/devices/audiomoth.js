"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioMothDevice = void 0;
const guards_1 = require("./guards");
exports.AudioMothDevice = {
    id: 'audio-moth',
    meta: {
        name: 'Audio Moth',
        icon: 'fas fa-microphone',
    },
    guards: {
        errors: [
            [guards_1.MustBeDirectory, 'You must select a directory (folder)'],
            [guards_1.MustNotBeEmpty, 'The selected directory is empty'],
        ],
        warnings: [],
    },
    filters: [],
};
