@echo off
cls
echo ========================================
echo    INICIALIZADOR DO SISTEMA
echo    Landing Page - Saude em Habitos
echo ========================================
echo.

REM Verifica se o Node.js esta instalado
echo [1/5] Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [ERRO] Node.js nao encontrado!
    echo Por favor, instale o Node.js em: https://nodejs.org/
    echo.
    pause
    exit /b 1
)
node --version
echo.

REM Limpa caches e pastas de build
echo [2/5] Limpando caches e builds antigos...
if exist "node_modules" (
    echo   - Removendo node_modules...
    rmdir /s /q "node_modules" 2>nul
)
if exist "dist" (
    echo   - Removendo dist...
    rmdir /s /q "dist" 2>nul
)
if exist "build" (
    echo   - Removendo build...
    rmdir /s /q "build" 2>nul
)
if exist ".cache" (
    echo   - Removendo .cache...
    rmdir /s /q ".cache" 2>nul
)
if exist ".parcel-cache" (
    echo   - Removendo .parcel-cache...
    rmdir /s /q ".parcel-cache" 2>nul
)
echo   - Limpeza concluida!
echo.

REM Limpa cache do npm
echo [3/5] Limpando cache do npm...
call npm cache clean --force
echo.

REM Instala dependencias
echo [4/5] Instalando dependencias...
call npm install
if %errorlevel% neq 0 (
    echo.
    echo [ERRO] Falha ao instalar dependencias!
    echo.
    pause
    exit /b 1
)
echo.

REM Inicia o servidor de desenvolvimento
echo [5/5] Iniciando servidor de desenvolvimento...
echo.
echo ========================================
echo    SERVIDOR RODANDO EM:
echo    http://localhost:3000
echo ========================================
echo.
echo Pressione Ctrl+C para parar o servidor
echo.

call npm run dev
