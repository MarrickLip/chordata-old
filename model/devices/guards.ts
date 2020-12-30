import { WebkitFile } from './devices';

export type FileListGuard = (files: FileList) => boolean

const getPaths = (files: FileList) =>
	Array.from(files).map((file) => (file as WebkitFile).webkitRelativePath);

export const MustBeDirectory: FileListGuard = (files: FileList) =>
	getPaths(files).every((path) => !!path);

export const MustNotBeEmpty: FileListGuard = (files: FileList) =>
	files.length > 0;

export const AllPathsMatch = {
	forPattern: (pattern: RegExp) => (files) =>
		getPaths(files).every((path) => pattern.test(path)),
};

export const NoPathsMatch = {
	forPattern: (pattern: RegExp) => (files) =>
		getPaths(files).every((path) => !pattern.test(path)),
};

export const SomePathsMatch = {
	forPattern: (pattern: RegExp) => (files) =>
		getPaths(files).some((path) => pattern.test(path)),
};
