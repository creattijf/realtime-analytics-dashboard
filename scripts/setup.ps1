# Setup script for Windows
Write-Host "🚀 Setting up Analytics Dashboard..." -ForegroundColor Green

# Check Node.js
Write-Host "`nChecking Node.js installation..." -ForegroundColor Yellow
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion installed" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js not found. Please install Node.js 18+" -ForegroundColor Red
    exit 1
}

# Check Docker
Write-Host "`nChecking Docker installation..." -ForegroundColor Yellow
if (Get-Command docker -ErrorAction SilentlyContinue) {
    $dockerVersion = docker --version
    Write-Host "✅ $dockerVersion installed" -ForegroundColor Green
} else {
    Write-Host "❌ Docker not found. Please install Docker Desktop" -ForegroundColor Red
    exit 1
}

# Install Backend Dependencies
Write-Host "`n📦 Installing backend dependencies..." -ForegroundColor Yellow
Set-Location backend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Backend installation failed" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Backend dependencies installed" -ForegroundColor Green

# Install Frontend Dependencies
Write-Host "`n📦 Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location ../frontend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend installation failed" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green

# Create logs directory
Set-Location ../backend
if (-not (Test-Path "logs")) {
    New-Item -ItemType Directory -Path "logs"
    Write-Host "✅ Created logs directory" -ForegroundColor Green
}

# Copy environment files
Set-Location ..
if (-not (Test-Path "backend/.env")) {
    Copy-Item "backend/.env.example" "backend/.env"
    Write-Host "✅ Created backend/.env" -ForegroundColor Green
}

if (-not (Test-Path "frontend/.env.development")) {
    Write-Host "✅ Frontend environment files ready" -ForegroundColor Green
}

Write-Host "`n✨ Setup completed successfully!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Start infrastructure: .\scripts\start-dev.ps1" -ForegroundColor White
Write-Host "2. Access dashboard: http://localhost:3000" -ForegroundColor White
Write-Host "3. Login with: admin@demo.com / password" -ForegroundColor White