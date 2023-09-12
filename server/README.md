## Evironment variables

.env file in the root directory

```bash
#for DB
PORT=8001
MONGODB_URI=mongodb://127.0.0.1:27017
DB_NAME=KNGofWRD
DB_USER=
DB_PASS=
#for URL
CLIENT_URL=http://localhost:3001
CLIENT_SOCKET_URL=http://localhost:3001
SERVER_URL=http://localhost:8001
#for game config
QUESTIONS_PER_GAME=5
DURATION_OF_BREAK_TIME=4
DURATION_OF_ANSWER_TIME=10
#for oauth2
CALLBACK_URL=http://localhost:8001/auth/google/callback
GOOGLE_CLIENT_ID=330173666886-31ef87s1raimrdk67b2756jfafnh5ngu.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
#for paypal
PAYPAL_CLIENT_ID=ASib_kN0YpfyOTTrZOI0cjNIszkdXEZrgBI_qSNi1uoXTLSiBPTHE95nT_miWzEiChLQDlhUffenT3kL
PAYPAL_SECRET_ID=ECzyQBb2vXVT9EN6rhvAV56QbAVW2fvqW7xSCNPmVvJMJLtRCJw00QC2bnB2TAsr6ofjL0zcbPR1zgNr

```

## Run command

```bash
yarn install
#then
yarn start
```

Open [http://localhost:8001](http://localhost:8001) with your browser to see the result.

## Docker

using Docker instead

```
docker pull tranhau1821/kngofwrd:kow_api
```

My docker image [here](https://hub.docker.com/layers/tranhau1821/kngofwrd/kow_api/images/sha256-b0b02d57574ab443d60f733896dd67c9946d91a12667fa149558f770465e3a05?context=repo)
