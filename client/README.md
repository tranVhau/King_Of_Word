## Evironment variables

.env file in the root directory

```bash
#this NEXT_PUBLIC_GOOGLE_AUTH_URL need to pre-config on google clound console Oauth2
#need other config for your own
NEXT_PUBLIC_GOOGLE_AUTH_URL=http://localhost:8001/auth/google

NEXT_PUBLIC_BACKEND_SOCKET_URL=http://localhost:8001
BACKEND_SOCKET_URL=http://localhost:8001
```

## Run command

```bash
yarn install
#then
yarn dev
#or
yarn build & start
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Docker

using docker instead

```
docker pull tranhau1821/kngofwrd:kow_frontend
```

See my Docker Image [here](https://hub.docker.com/layers/tranhau1821/kngofwrd/kow_frontend/images/sha256-53317bd0b90cedc8fb44e18bcc4a32750f66d181eeae57d8c9a8a45a3899b045?context=repo)
