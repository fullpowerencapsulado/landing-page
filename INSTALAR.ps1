# Script de Instalação - Full Power Landing Page
# Execute este arquivo no PowerShell como Administrador

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  FULL POWER - Landing Page Setup  " -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se Node.js está instalado
Write-Host "Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js instalado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js não encontrado!" -ForegroundColor Red
    Write-Host "Por favor, instale o Node.js em: https://nodejs.org/" -ForegroundColor Red
    Write-Host "Pressione qualquer tecla para abrir o site..." -ForegroundColor Yellow
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    Start-Process "https://nodejs.org/"
    exit
}

# Verificar se npm está instalado
Write-Host "Verificando npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✓ npm instalado: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ npm não encontrado!" -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan

# Ir para a pasta do projeto
$projectPath = "D:\Sistemas\Encapsulado"
Write-Host "Navegando para: $projectPath" -ForegroundColor Yellow

if (!(Test-Path $projectPath)) {
    Write-Host "Criando pasta do projeto..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $projectPath -Force | Out-Null
}

Set-Location $projectPath
Write-Host "✓ Pasta do projeto pronta" -ForegroundColor Green

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan

# Instalar dependências
Write-Host "Instalando dependências..." -ForegroundColor Yellow
Write-Host "Isso pode levar alguns minutos na primeira vez..." -ForegroundColor Gray
Write-Host ""

npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✓ Dependências instaladas com sucesso!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "✗ Erro ao instalar dependências!" -ForegroundColor Red
    Write-Host "Tente executar manualmente: npm install" -ForegroundColor Yellow
    exit
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  INSTALAÇÃO CONCLUÍDA COM SUCESSO! " -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Para iniciar o servidor de desenvolvimento, execute:" -ForegroundColor Yellow
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""

Write-Host "O site abrirá automaticamente em:" -ForegroundColor Yellow
Write-Host "  http://localhost:3000" -ForegroundColor White
Write-Host ""

Write-Host "Deseja iniciar o servidor agora? (S/N)" -ForegroundColor Cyan
$resposta = Read-Host

if ($resposta -eq "S" -or $resposta -eq "s") {
    Write-Host ""
    Write-Host "Iniciando servidor de desenvolvimento..." -ForegroundColor Green
    Write-Host "Pressione Ctrl+C para parar o servidor" -ForegroundColor Gray
    Write-Host ""
    npm run dev
} else {
    Write-Host ""
    Write-Host "Ok! Execute 'npm run dev' quando quiser iniciar." -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "Pressione qualquer tecla para sair..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
