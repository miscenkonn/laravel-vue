##### client

- cd client
- npm install
- npm run dev
- change api url in .env file

#### server
- cd server
- php artisan migrate --seed
- php artisan serve

#### add this to php.ini
    variables_order = "GPCS"
