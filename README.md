#client
##cd client
##npm install
##npm run dev

server
  cd server
  php artisan migrate --seed
  php artisan serve

  php.ini
    extension=mysqli
    allow_url_fopen = On
    extension_dir = "ext"
    extension=curl
    extension=mbstring
    extension=openssl
    extension=fileinfo
    extension=pdo_mysql
    variables_order = "GPCS"
