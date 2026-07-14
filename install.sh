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

echo -e "${GREEN}[2/6]${NC} Downloading SK Host Theme Files..."
# Clean any previous temp downloads
rm -rf /tmp/skhost-theme
mkdir -p /tmp/skhost-theme
# In a real scenario, this would download a release zip containing only 'resources' and 'public' folders
curl -sL https://github.com/sdgamer8263-sketch/special-/archive/refs/heads/main.tar.gz | tar -xz -C /tmp/skhost-theme --strip-components=1

echo -e "${GREEN}[3/6]${NC} Installing SK Host theme..."
# SAFE COPY: Only copy resources and public folders to prevent overwriting package.json and core files
if [ -d "/tmp/skhost-theme/resources" ]; then
    cp -rf /tmp/skhost-theme/resources/* /var/www/pterodactyl/resources/
fi
if [ -d "/tmp/skhost-theme/public" ]; then
    cp -rf /tmp/skhost-theme/public/* /var/www/pterodactyl/public/
fi

# Optional: If Blueprint is installed and a blueprint.yml exists in the theme
if command -v blueprint &> /dev/null && [ -f "/tmp/skhost-theme/blueprint.yml" ]; then
    echo -e "${GREEN}[+]${NC} Blueprint configuration found! Registering extension..."
    cp /tmp/skhost-theme/blueprint.yml /var/www/pterodactyl/
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
rm -rf /tmp/skhost-theme

echo ""
echo -e "${GREEN}====================================================${NC}"
echo -e "${GREEN}  Installation Complete! SK Host is ready to use.   ${NC}"
echo -e "${GREEN}====================================================${NC}"
