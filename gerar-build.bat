@echo off
cls
echo ========================================
echo    GERADOR DE BUILD DE PRODUCAO
echo    Landing Page - Saude em Habitos
echo ========================================
echo.

REM Verifica se o Node.js esta instalado
echo [1/4] Verificando Node.js...
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

REM Verifica dependencias
echo [2/4] Verificando dependencias...
if not exist "node_modules" (
    echo   Instalando dependencias...
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo [ERRO] Falha ao instalar dependencias!
        echo.
        pause
        exit /b 1
    )
)
echo   Dependencias OK!
echo.

REM Remove build anterior
echo [3/4] Limpando build anterior...
if exist "dist" (
    rmdir /s /q "dist" 2>nul
    echo   Build anterior removido!
)
echo.

REM Gera novo build
echo [4/4] Gerando build de producao...
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo [ERRO] Falha ao gerar build!
    echo.
    pause
    exit /b 1
)
echo.

echo ========================================
echo    BUILD GERADO COM SUCESSO!
echo ========================================
echo.
echo Localizacao: %CD%\dist
echo.
echo Proximo passo:
echo 1. Acesse a pasta 'dist'
echo 2. Faca upload dos arquivos para:
echo    serverartseven.com.br/saudeemhabitos/
echo.
echo Deseja visualizar o build localmente? (S/N)
set /p resposta=
if /i "%resposta%"=="S" (
    echo.
    echo Iniciando preview...
    call npm run preview
)
echo.
pause
