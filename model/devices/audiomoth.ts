import { Device } from './devices';
import {
	AllPathsMatch,
	SomePathsMatch,
	MustBeDirectory,
	MustNotBeEmpty,
	NoPathsMatch,
} from './guards';

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
			[
				SomePathsMatch.forPattern(/^[^\/]*\/[^\/]*.(?:wav|WAV)$/),
				'No .wav files found',
			],
			[
				SomePathsMatch.forPattern(
					/^[^\/]*\/[0-9]{4}[01][0-9][0-3][0-9]_[0-2][0-9](?:[0-5][0-9]){2}.(?:wav|WAV)$/
				),
				'No AudioMoth .wav files found (e.g. 20200614_135432.WAV)',
			],
		],
		warnings: [
			[
				NoPathsMatch.forPattern(/^[^\/]*\/.*\/.*$/),
				'Ignoring sub-directories',
			],
		],
	},
	filters: [],
};
