## Event API

Management of event API, under the main [organiser API](./README.md)

### Event Request Object Details

| Parameter Name   | Required | Type           | Description                                                | Length Limits |
|------------------|----------|----------------|------------------------------------------------------------|---------------|
| eventID          | yes      | String (UTF-8) | Base 58 - GUID string to identify the event                | 32 bytes      |
| groupID          | yes      | String (UTF-8) | Base 58 - GUID string to identify the group                | 32 bytes      |
| title            | yes      | String (UTF-8) | Event title                                                | 40 bytes      |
| shortDescription | yes      | String (UTF-8) | Short event description                                    | 140 bytes     |
| startTime        | yes      | String (UTF-8) | Event start time (ISO 8601 Extended Format with Timezone)  | 30 bytes      |
| endTime          | yes      | String (UTF-8) | Event ending time (ISO 8601 Extended Format with Timezone) | 30 bytes      |
| publicURL        | yes      | String (UTF-8) | Full link to the event details (including RSVP)            | 2048 bytes    |
| countryCode      | yes      | String (UTF-8) | ISO 3166-2 country code format (XX-YYZ)                    | 6 bytes       |
| address          | yes      | String (UTF-8) | Address for event                                          | 140 bytes     |
| thumbnail        | optional | String (UTF-8) | URL for the thumbnail image                                | 2048 bytes    |

### /event/:eventID/create

Add or register a event.

**Type:** POST request

**Authenticate:** using provider public key

**Request Object Parameters:** see `event Request Object Details`

**Sample response**

If registered succesfully:

```
{ "result": true }
```

If eventID already exists in the registry:

```
{ 
	"error": {
		"code" : "DUPLICATE_ID",
		"message" : "Existing eventID found"
	} 
}
```

### /event/:eventID/update

Edit a event.

**type:** PUT/POST request

**Authenticate:** using event public key

**Request Object Parameters:** see `event Request Object Details`

**Sample response**

If updated successfully:

```
{ "result": true }
```

If eventID doesn't exist:

```
{
	"error": {
		"code" : "NOT_REGISTERED",
		"message" : "eventID not found"
	}
}
```

If public key does not match eventID:

```
{
	"error": {
		"code" : "INVALID_KEY",
		"message" : "Public key does not match key registered with this eventID"
	}
}
```

### /event/:eventID/changeKey

Update the event key

**Authenticate:** using event existing public key

**Request Object Parameters:** see `Change Public Key Update Details`

The request is validated with the `publicKey` and the `signature` in the surrounding request object. The `newPublicKey` is then set as the key associated with this `eventID`

**Sample response**

If updated successfully:

```
{ "result": true }
```

If eventID doesn't exist:

```
{
	"error": {
		"code" : "NOT_REGISTERED",
		"message" : "eventID not found"
	}
}
```

If public key does not match eventID:

```
{
	"error": {
		"code" : "INVALID_KEY",
		"message" : "Public key does not match key registered with this eventID"
	}
}
```
