# oyster-api [![Codacy Badge](https://www.codacy.com/project/badge/21d98d9476d54e57a00d3f0fdfa78f6e)](https://www.codacy.com)

**Unofficial** API to check Oyster balance (hopefully more including travel history soon).

# API Docs

## Root Endpoint

I ([@bencevans](https://github.com/bencevans)) run a version of this at `https://oyster-scrape-api.herokuapp.com` or `http://oyster.bensbit.co.uk`. You're welcome to use this but I provide no warranty as to uptime or security.

## Authentication

Oyster API uses HTTP Basic authentication using you oyster username and password.

    $ curl http://oyster-api.bensbit.co.uk/balance -u username:password

**Invalid Authentication Response**

```
HTTP/1.1 401

{
  "error": "Authentication Invalid"
}
```

Missing Credentials

```
HTTP/1.1 401

{
  "error": "Authentication Not Provided"
}
```

## Methods

### Validate Authentication (Requires Authentication)

    GET /valid_auth

If authentication is valid:

```
HTTP/1.1 200

{
  "valid_auth": true
}
```

Else if authentication fails a JSON object with an error key is returned describing the issue.

### Checking Balance (Requires Authentication)

    GET /balance

```
HTTP/1.1 200

{
  "balance": 17.7
}
```

# Running Locally

    git clone https://github.com/bencevans/oyster-api.git
    cd oyster-api
    npm install
    npm start

# Deployment

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

# Licence

MIT
