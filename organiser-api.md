# Organiser API

The following is the draft spec for the API's used by "organiser servers" to sync data to a "public registry".

All endpoints are prefixed with `/v1/organiser/` 


## General Purpose API

### /organiser/api-version

Returns the current API version. This 

**type:** GET request

**Sample Response**
```
{ "api-version" : "1.0.0" }
```

## Server API

### /organiser/server/:serverID/set

### /organiser/server/:serverID/get

### /organiser/server/:serverID/changeKey

## /organiser/group/:groupID/set

## /organiser/group/:groupID/get

## /organiser/group/:groupID/changeKey

## /organiser/event/:eventID/set

## /organiser/event/:eventID/get


