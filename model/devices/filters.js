"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IncludePathPattern = (pattern) => ((files) => Array.from(files)
    .filter(file => {
    const path = file.webkitRelativePath;
    return pattern.test(path);
}));
