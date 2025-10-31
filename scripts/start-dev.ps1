# Start development environment
Write-Host "🚀 Starting Analytics Dashboard (Development Mode)..." -ForegroundColor Green

# Start Docker services
Write-Host "`n🐳 Starting PostgreSQL and Redis..." -ForegroundColor Yellow
docker-compose -f docker-compose.dev.yml up -d

# Wait for services
Write-Host "`n⏳ Waiting for services to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Check if services are running
$postgres = docker ps --filter "name=analytics_postgres_dev" --format "{{.Names}}"
$redis = docker ps --filter "name=analytics_redis_dev" --format "{{.Names}}"

if ($postgres -and $redis) {
    Write-Host "✅ Database services are running" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to start services" -ForegroundColor Red
    exit 1
}

# Start backend
Write-Host "`n🔧 Starting backend server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev"

# Wait a bit
Start-Sleep -Seconds 3

# Start frontend
Write-Host "`n🎨 Starting frontend application..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm start"

Write-Host "`n✨ Development environment started!" -ForegroundColor Green
Write-Host "`nServices:" -ForegroundColor Cyan
Write-Host "  Frontend:  http://localhost:3000" -ForegroundColor White
Write-Host "  Backend:   http://localhost:5000" -ForegroundColor White
Write-Host "  Postgres:  localhost:5432" -ForegroundColor White
Write-Host "  Redis:     localhost:6379" -ForegroundColor White
Write-Host "`nLogin credentials:" -ForegroundColor Cyan
Write-Host "  Email:     admin@demo.com" -ForegroundColor White
Write-Host "  Password:  password" -ForegroundColor White