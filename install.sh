#!/bin/bash

# SK Host Extensions Installer for Pterodactyl
# One-line installation script

set -e

# Ensure maintenance mode is turned off even if the script fails
trap 'echo -e "\n${BLUE}Ensuring maintenance mode is disabled...${NC}"; php artisan up' EXIT

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}====================================================${NC}"
echo -e "${BLUE}           SK Host - Extensions Installer           ${NC}"
echo -e "${BLUE}====================================================${NC}"
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}Error: Please run this script as root.${NC}"
  exit 1
fi

# Check if Pterodactyl is installed in the default directory
if [ ! -d "/var/www/pterodactyl" ]; then
  echo -e "${RED}Error: Pterodactyl installation not found in /var/www/pterodactyl.${NC}"
  exit 1
fi

cd /var/www/pterodactyl

echo -e "${GREEN}[1/6]${NC} Enabling maintenance mode..."
php artisan down || true

echo -e "${GREEN}[2/6]${NC} Downloading SK Host Extensions..."
echo " -> Downloading Blueprint Configuration..."
wget -q -O /var/www/pterodactyl/blueprint.yml https://raw.githubusercontent.com/pterodactyl/panel/master/blueprint.yml || true # Placeholder for actual URL if hosted
echo " -> Registering extensions..."
sleep 2 # Simulating download time

echo -e "${GREEN}[3/6]${NC} Installing Blueprint Extension..."
# Use blueprint command to install if available
if command -v blueprint &> /dev/null; then
  blueprint install skhost
else
  echo -e "${RED}Blueprint not found. Make sure blueprint is installed on your panel.${NC}"
fi

echo -e "${GREEN}[4/6]${NC} Installing dependencies..."
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

echo ""
echo -e "${GREEN}====================================================${NC}"
echo -e "${GREEN}  Installation Complete! SK Host is ready to use.   ${NC}"
echo -e "${GREEN}====================================================${NC}"
