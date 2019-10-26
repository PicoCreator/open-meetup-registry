# Organiser API

The following is the draft spec for the API's used by "organiser servers" to sync data to a "public registry".

All endpoints are prefixed with `/v1/organiser/` 

---

## API Preamble

### POST-ing / editing API data

All API calls for create (POST) or edit (PUT/POST) , are required to.

- be submitted with a "request" object
- be authenticated with a public key with signature
- be submitted as JSON request with `content-type: application/json`

> Note that edit is intentionally configured to support POST, to make this easier for any developer to build on, without following REST strictly.

**Sample Parameters**
```
{
	"request" : {
		...
	},
	"publickey" : "...",
	"hmac" : "..."
}
```

### Object Status

All providers, groups, and events objects - go through the following registration status

| Object Status    | Description                                                                                   |
|------------------|-----------------------------------------------------------------------------------------------|
| NOT_REGISTERED   | Reserved keyword                                                                              |
| PENDING_APPROVAL | Reserved keyword - used to indicate it is registered, and pending an approval process         |
| PROVISIONAL      | Reserved keyword - used to indicate it is registered, and may or may not be visible to public |
| REGISTERED       | Indicate that the object is registered and visible to public                                  |
| BLOCKED          | Indicate that the object is blocked                                                           |

It is not required for the registry to implement all status code

---

## General Purpose API

### /api-version

Returns the current API version. This should be checked by implementing clients for any incomptiblity changes

**type:** GET request

**Sample Response**
```
{ "api-version" : "1.0.0" }
```

## Provider API

### /provider/:serverID/create

Add or registry an organiser provider.

**type:** POST request

**Request Object Parameters:**
| Parameter Name | Type   | Description                                          |
|----------------|--------|------------------------------------------------------|
| serverID       | String | Base 58 - GUID string to identify the server         |
| niceName       | String | Nice server name string (for administration purpose) |
| publicURL      | String | URL of the public server                             |
| publicKey      | String | Public key used to identify the server               |

**Sample response**

If registered succesfully.

```
{ "result": true }
```

If a collision error occur

```
{ 
	"error": {
		"code" : "DUPLICATE_ID",
		"message" : "Existing serverID found"
	} 
}
```

### /provider/:serverID/update

### /provider/:serverID/changeKey

## /group/:groupID/set

## /organiser/group/:groupID/get

## /organiser/group/:groupID/changeKey

## /organiser/event/:eventID/set

## /organiser/event/:eventID/get


