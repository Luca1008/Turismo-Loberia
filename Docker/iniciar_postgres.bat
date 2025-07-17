@echo off
cd /d "%~dp0"
echo Iniciando PostgreSQL con Docker Compose...
docker-compose up -d
pause
