## Group API

Management of Group API, under the main [organiser API](./README.md)

### Group Request Object Details

| Parameter Name | Type           | Description                                                    | Length limits   |
|----------------|----------------|----------------------------------------------------------------|-----------------|
| groupID        | String (UTF-8) | Base 58 - GUID string to identify the group                    | 32 bytes        |
| providerID     | String (UTF-8) | Base 58 - GUID string to identify the provider                 | 32 bytes        |
| name           | String (UTF-8) | Nice group name                                                | 100 bytes       |
| publicURL      | String (UTF-8) | URL of the public server                                       | 2048 bytes      |
| publicKey      | String (UTF-8) | Public key used to identify the server, Base64 encoded         | 1024 bytes      |
| countryCode    | String (UTF-8) | ISO 3166-2 country code format (XX-YYZ)                        | 6 bytes         |

### /group/:groupID/create

Add or register a group.

**Type:** POST request

**Authenticate:** using provider public key

**Request Object Parameters:** see `Group Request Object Details`

**Sample response**

If registered succesfully:

```
{ "result": true }
```

If groupID already exists in the registry:

```
{ 
	"error": {
		"code" : "DUPLICATE_ID",
		"message" : "Existing groupID found"
	} 
}
```

### /group/:groupID/update

Edit a group.

**type:** PUT/POST request

**Authenticate:** using provider/group public key

**Request Object Parameters:** see `group Request Object Details`

**Sample response**

If updated successfully:

```
{ "result": true }
```

If groupID doesn't exist:

```
{
	"error": {
		"code" : "NOT_REGISTERED",
		"message" : "groupID not found"
	}
}
```

If public key does not match groupID:

```
{
	"error": {
		"code" : "INVALID_KEY",
		"message" : "Public key does not match key registered with this groupID"
	}
}
```
