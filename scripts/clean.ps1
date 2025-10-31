# Clean project
Write-Host "🧹 Cleaning project..." -ForegroundColor Yellow

# Stop all services
docker-compose down -v
docker-compose -f docker-compose.dev.yml down -v

# Remove node_modules
if (Test-Path "backend/node_modules") {
    Remove-Item -Recurse -Force "backend/node_modules"
    Write-Host "✅ Removed backend/node_modules" -ForegroundColor Green
}

if (Test-Path "frontend/node_modules") {
    Remove-Item -Recurse -Force "frontend/node_modules"
    Write-Host "✅ Removed frontend/node_modules" -ForegroundColor Green
}

# Remove build artifacts
if (Test-Path "backend/dist") {
    Remove-Item -Recurse -Force "backend/dist"
    Write-Host "✅ Removed backend/dist" -ForegroundColor Green
}

if (Test-Path "frontend/build") {
    Remove-Item -Recurse -Force "frontend/build"
    Write-Host "✅ Removed frontend/build" -ForegroundColor Green
}

# Remove logs
if (Test-Path "backend/logs") {
    Remove-Item -Recurse -Force "backend/logs"
    Write-Host "✅ Removed logs" -ForegroundColor Green
}

Write-Host "`n✨ Project cleaned!" -ForegroundColor Green