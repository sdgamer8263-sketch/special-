#!/bin/bash

# SK Host - Fix 503 Error and Panel Build
echo "Fixing Pterodactyl Panel 503 Error..."
cd /var/www/pterodactyl

# 1. Turn off maintenance mode (fixes 503 if stuck)
php artisan up

# 2. Fix permissions
chown -R www-data:www-data /var/www/pterodactyl/*

# 3. Clear caches
php artisan optimize:clear
php artisan view:clear
php artisan config:clear

# 4. Fix Node.js OpenSSL error and rebuild
export NODE_OPTIONS=--openssl-legacy-provider
yarn build:production

# 5. Final permission fix and cache clear
chown -R www-data:www-data /var/www/pterodactyl/*
php artisan optimize:clear
php artisan up

echo "Done! Refresh your panel. The 503 error should be gone and SK Host theme/extensions should be active."
