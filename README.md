# blend
git clone https://github.com/hektahendrapriana/blendmedia blend

## API
Tech Stack :
* nodejs
* expressjs
* MERN


### Instal Database
cd api\
nano .env

**copy to .env**

*   NODE_ENV="development"
*   PORT=8080
*   JWT_SECRET="7D6425FAC26477182B78C8F2F39CE"
*   JWT_EXPIRATION_IN_MINUTES=1440
*   MONGO_URI="mongodb://localhost:27017/blend"
*   EMAIL_FROM_NAME="iBox"
*   EMAIL_FROM_ADDRESS="no-reply@ibox.co.id"
*   EMAIL_SMTP_DOMAIN_MAILGUN="ibox.co.id"
*   EMAIL_SMTP_API_MAILGUN=123456
*   FRONTEND_URL=http://localhost:3000
*   BECKEND_URL=http://localhost:8080/blend/api
*   USE_REDIS=false
*   REDIS_HOST=127.0.0.1
*   REDIS_PORT=6379
*   MJ_API_KEY="a45126939c9654f1ee368d2203ad5d10"
*   MJ_API_SECRET="fdd85cd7b7edb1afb50eebfbc563169a"

setelah itu, jalankan perintah ini :

npm run seed

ketika sudah berhasil, jalankan perintah :\
npm run dev

tunggu sampai log berhasil seperti di bawah ini :

[nodemon] starting `node --inspect=9230 server.js`\
Debugger listening on ws://127.0.0.1:9230/4535f67c-9131-4ae7-81e5-3544bf8873bd\
For help, see: https://nodejs.org/en/docs/inspector \
****************************\
*    Starting Server\
*    Port: 8080\
*    NODE_ENV: development\
*    Database: MongoDB\
*    DB Connection: OK\
****************************\

