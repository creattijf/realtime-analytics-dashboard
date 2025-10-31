# Stop all services
Write-Host "🛑 Stopping Analytics Dashboard..." -ForegroundColor Yellow

# Stop development services
docker-compose -f docker-compose.dev.yml down

# Stop production services
docker-compose down

Write-Host "✅ All services stopped" -ForegroundColor Green