##### client

- cd client
- npm install
- update api url in .env file
- npm run dev

#### server
- cd server
- php artisan migrate --seed
- php artisan serve

#### add this to php.ini
    variables_order = "GPCS"
