#!/bin/bash

set -e

# Ensure maintenance mode is turned off even if the script fails
trap 'echo -e "\n\033[0;34mEnsuring maintenance mode is disabled...\033[0m"; php artisan up' EXIT

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}====================================================${NC}"
echo -e "${BLUE}   SK Host - Automatic Theme & Extension Installer  ${NC}"
echo -e "${BLUE}====================================================${NC}"
echo ""

if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}Error: Please run this script as root.${NC}"
  exit 1
fi

if [ ! -d "/var/www/pterodactyl" ]; then
  echo -e "${RED}Error: Pterodactyl installation not found in /var/www/pterodactyl.${NC}"
  exit 1
fi

cd /var/www/pterodactyl

echo -e "${GREEN}[1/6]${NC} Enabling maintenance mode..."
php artisan down || true

echo -e "${GREEN}[2/6]${NC} Downloading SK Host Files from GitHub..."
# Clean any previous temp downloads
rm -rf /tmp/special--main
# Download the latest files from your repository
curl -sL https://github.com/sdgamer8263-sketch/special-/archive/refs/heads/main.tar.gz | tar -xz -C /tmp/

echo -e "${GREEN}[3/6]${NC} Overwriting panel files with SK Host theme..."
# Copy all files from the downloaded repo directly into the Pterodactyl directory
cp -rf /tmp/special--main/* /var/www/pterodactyl/

# Optional: If Blueprint is installed and a blueprint.yml was copied over
if command -v blueprint &> /dev/null && [ -f "/var/www/pterodactyl/blueprint.yml" ]; then
    echo -e "${GREEN}[+]${NC} Blueprint configuration found! Registering extension..."
    blueprint install skhost || true
fi

echo -e "${GREEN}[4/6]${NC} Installing Node dependencies..."
yarn install

echo -e "${GREEN}[5/6]${NC} Building panel frontend (this may take a few minutes)..."
# Fix for Node.js 17+ OpenSSL error during webpack build
export NODE_OPTIONS=--openssl-legacy-provider
yarn build:production

echo -e "${GREEN}[6/6]${NC} Clearing cache and optimizing..."
php artisan optimize:clear
php artisan view:clear
php artisan config:clear
chown -R www-data:www-data /var/www/pterodactyl/*

# Cleanup temp files
rm -rf /tmp/special--main

echo ""
echo -e "${GREEN}====================================================${NC}"
echo -e "${GREEN}  Installation Complete! SK Host is ready to use.   ${NC}"
echo -e "${GREEN}====================================================${NC}"
