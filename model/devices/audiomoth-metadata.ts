import { MetadataValidator } from './devices';

// {location: {crs: "wgs84", x: "12324.231", y: "2132.42"}, tags: ["Bats"], summary: "Where in the world", notes: "these are the notes"}

const LOCATION_X_IS_NUMBER = {
	type: 'object',
	properties: {
		location: {
			type: 'object',
			properties: {
				x: { type: 'number'},
			}
		}
	}
};

const LOCATION_Y_IS_NUMBER = {
	type: 'object',
	properties: {
		location: {
			type: 'object',
			properties: {
				y: { type: 'number'},
			}
		}
	}
};

const IF_NZTM_THEN_X_POSITIVE_INTEGER = {
	type: 'object',
	properties: {
		location: {
			type: 'object',
			if: {
				properties: { crs: { const: 'nztm' } }
			},
			then: {
				properties: { x: { type: 'integer', minimum: 0 }}
			}
		}
	}
};

const IF_NZTM_THEN_Y_POSITIVE_INTEGER = {
	type: 'object',
	properties: {
		location: {
			type: 'object',
			if: {
				properties: { crs: { const: 'nztm' } }
			},
			then: {
				properties: { y: { type: 'integer', minimum: 0 }}
			}
		}
	}
};

const SUMMARY_REQUIRED = {
	type: 'object',
	properties: {
		summary: {
			type: 'string',
			minLength: 1,
		}
	},
	required: ['summary'],
}

export const AUDIOMOTH_METADATA: MetadataValidator[] = [
	{
		field: 'location.x',
		schema: LOCATION_X_IS_NUMBER,
		message: 'x must be a number',
	},
	{
		field: 'location.y',
		schema: LOCATION_Y_IS_NUMBER,
		message: 'y must be a number',
	},
	{
		field: 'location.x',
		schema: IF_NZTM_THEN_X_POSITIVE_INTEGER,
		message: 'NZTM coordinates must be positive integers',
	},
	{
		field: 'location.y',
		schema: IF_NZTM_THEN_Y_POSITIVE_INTEGER,
		message: 'NZTM coordinates must be positive integers',
	},

];