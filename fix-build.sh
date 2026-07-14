#!/bin/bash

# SK Host - Fix Webpack Error (ERR_OSSL_EVP_UNSUPPORTED)
# This error occurs because Node.js 17+ is being used with Webpack 4.
# This script sets the legacy OpenSSL provider and rebuilds the panel.

echo "Fixing Pterodactyl Panel Build Error..."
cd /var/www/pterodactyl

# Set the environment variable to fix the Node.js OpenSSL error
export NODE_OPTIONS=--openssl-legacy-provider

# Run the build process
echo "Running yarn build:production..."
yarn build:production

# Clear caches and fix permissions
echo "Optimizing panel..."
php artisan optimize:clear
php artisan view:clear
php artisan config:clear
chown -R www-data:www-data /var/www/pterodactyl/*

echo "Build complete!"
