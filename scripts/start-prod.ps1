# Start production environment
Write-Host "🚀 Starting Analytics Dashboard (Production Mode)..." -ForegroundColor Green

# Build and start all services
Write-Host "`n🐳 Building and starting all services..." -ForegroundColor Yellow
docker-compose up -d --build

# Wait for services
Write-Host "`n⏳ Waiting for services to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Check services
Write-Host "`n📊 Service Status:" -ForegroundColor Cyan
docker-compose ps

Write-Host "`n✨ Production environment started!" -ForegroundColor Green
Write-Host "`nAccess:" -ForegroundColor Cyan
Write-Host "  Dashboard: http://localhost:3000" -ForegroundColor White
Write-Host "  API:       http://localhost:5000" -ForegroundColor White