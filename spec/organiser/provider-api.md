## Provider API

Management of providers API, under the main [organiser API](./README.md)

### Provider Request Object Details

| Parameter Name | Type           | Description                                                    | Length limits   |
|----------------|----------------|----------------------------------------------------------------|-----------------|
| providerID     | String (UTF-8) | Base 58 - GUID string to identify the provider                 | 32 bytes        |
| name           | String (UTF-8) | Nice server name string (for administrative purposes)          | 100 bytes       |
| publicURL      | String (UTF-8) | URL of the public server                                       | 2048 bytes      |
| publicKey      | String (UTF-8) | Public key used to identify the server, Base64 encoded         | 1024 bytes      |

### /provider/:providerID/create

Add or register a provider.

**Type:** POST request

**Request Object Parameters:** see `Provider Request Object Details`

**Sample request**
```
{
	"providerID": "Wgx98Rbi8nQuL9ddn3mTk1",
	"niceName": "Friendly Meetups",
	"publicURL": "https://friendlymeetups.com",
	"publicKey": "AAAAB3NzaC1yc2EAAAADAQABAAABAQCZqlC6FR3N2owDm0XEppLkSEQW2raVhoIOnFtDmiql+guZFoDZjHb77vpGKSQFhbGzqMlb1i0G90b6dHUKPVd+VU9aLKabHW0l2LnDuCfryrgpBq2b7cT73EVGU2AbBuDsGvXolTi61GRrb5/hU98+euYAre5dVAP5fa+IV55dvJ65FMjWFqL5sf1ZnHujil+Fh7g+j3G6nlj+QyGcLeCddJJFNsmszLK5EqzVPT27T2isYdRPDF5HiLgmR1hCFXAtwXxLDkcJoIXeTxBm43wwF6h/gATgKbEabB/bpOa5Y/uUGbmBvQWnTWAh4FRqORCFwCc+YC0Kk9ekoGlsY50Z"
}
```

**Sample response**

If registered succesfully:

```
{ "result": true }
```

If providerID already exists in the registry:

```
{ 
	"error": {
		"code" : "DUPLICATE_ID",
		"message" : "Duplicate providerID found"
	} 
}
```

### /provider/:providerID/update

Edit a provider.

**type:** PUT/POST request

**Authenticate:** using provider public key

**Request Object Parameters:** see `Provider Request Object Details`

**Sample request**
```
{
	"providerID": "Wgx98Rbi8nQuL9ddn3mTk1",
	"niceName": "UnFriendly Meetups",
	"publicURL": "https://friendlymeetups.com",
	"publicKey": "AAAAB3NzaC1yc2EAAAADAQABAAABAQCZqlC6FR3N2owDm0XEppLkSEQW2raVhoIOnFtDmiql+guZFoDZjHb77vpGKSQFhbGzqMlb1i0G90b6dHUKPVd+VU9aLKabHW0l2LnDuCfryrgpBq2b7cT73EVGU2AbBuDsGvXolTi61GRrb5/hU98+euYAre5dVAP5fa+IV55dvJ65FMjWFqL5sf1ZnHujil+Fh7g+j3G6nlj+QyGcLeCddJJFNsmszLK5EqzVPT27T2isYdRPDF5HiLgmR1hCFXAtwXxLDkcJoIXeTxBm43wwF6h/gATgKbEabB/bpOa5Y/uUGbmBvQWnTWAh4FRqORCFwCc+YC0Kk9ekoGlsY50Z"
}
```

**Sample response**

If updated successfully:

```
{ "result": true }
```

If providerID doesn't exist:

```
{
	"error": {
		"code" : "NOT_REGISTERED",
		"message" : "providerID not found"
	}
}
```

If public key does not match providerID:

```
{
	"error": {
		"code" : "INVALID_KEY",
		"message" : "Public key does not match key registered with this providerID"
	}
}
```

### /provider/:providerID/changeKey

Update the provider key

**Authenticate:** using provider existing public key

**Request Object Parameters:** see `Change Public Key Update Details`

The request is validated with the `publicKey` and the `signature` in the surrounding request object. The `newPublicKey` is then set as the key associated with this `providerID`

**Sample response**

If updated successfully:

```
{ "result": true }
```

If providerID doesn't exist:

```
{
	"error": {
		"code" : "NOT_REGISTERED",
		"message" : "providerID not found"
	}
}
```

If public key does not match providerID:

```
{
	"error": {
		"code" : "INVALID_KEY",
		"message" : "Public key does not match key registered with this providerID"
	}
}
```
