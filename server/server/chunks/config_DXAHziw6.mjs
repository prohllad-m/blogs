//#region \0virtual:emdash/config
var config_default = {
	"database": {
		"entrypoint": "emdash/db/postgres",
		"config": {
			"connectionString": "postgresql://postgres.acvsesxaprnzmwpxgkds:VT0RxYKEQrVKl4t5@aws-0-ap-south-1.pooler.supabase.com:6543/postgres",
			"ssl": { "rejectUnauthorized": false },
			"pool": {
				"max": 3,
				"min": 0
			}
		},
		"type": "postgres"
	},
	"storage": {
		"entrypoint": "emdash/storage/s3",
		"config": {
			"endpoint": "https://acvsesxaprnzmwpxgkds.storage.supabase.co/storage/v1/s3",
			"accessKeyId": "07d99c737899408311dbf46917a7d094",
			"secretAccessKey": "aefbd8042dfa1049688beefe5e3996b4c800917e60420f9f7144b722f701416c",
			"bucket": "blog",
			"region": "ap-south-1"
		}
	},
	"astroVersion": "7.2.4",
	"astroCspEnabled": false,
	"trailingSlash": "ignore"
};
//#endregion
export { config_default as t };
