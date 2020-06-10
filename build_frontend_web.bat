IF NOT EXIST client (
 mkdir client
 cd client
 mkdir public
 cd ..
)

cd ./frontend_vue/web_nutc
npm run build