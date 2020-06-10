IF NOT EXIST client (
 mkdir client
 cd client
 mkdir public
 cd ..
)
cd ./frontend_vue/app_nutc
npm run build