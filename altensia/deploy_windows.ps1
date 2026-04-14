# ALTENSIA - Script de deploiement Ionos
# Usage : powershell -ExecutionPolicy Bypass -File .\deploy_windows.ps1

# ==========================================
#  CONFIGURATION - A remplir avant de lancer
# ==========================================
$SSH_USER   = "votre_utilisateur"
$SSH_HOST   = "votre-serveur.ionos.fr"
$SSH_PORT   = "22"
$REMOTE_DIR = "/var/www/virtual/altensia.fr/html"
$LOCAL_DIR  = $PSScriptRoot
# ==========================================

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "=======================================" -ForegroundColor Blue
Write-Host "  ALTENSIA - Deploiement SSH Ionos     " -ForegroundColor Blue
Write-Host "=======================================" -ForegroundColor Blue
Write-Host ""

if ($SSH_USER -eq "votre_utilisateur" -or $SSH_HOST -eq "votre-serveur.ionos.fr") {
    Write-Host "ERREUR : renseignez SSH_USER et SSH_HOST dans le script." -ForegroundColor Red
    Write-Host "Ouvrez deploy_windows.ps1 avec le Bloc-notes et modifiez les lignes 8 et 9." -ForegroundColor Yellow
    Read-Host "Appuyez sur Entree pour fermer"
    exit 1
}

if (-not (Get-Command ssh -ErrorAction SilentlyContinue)) {
    Write-Host "ERREUR : SSH non disponible." -ForegroundColor Red
    Write-Host "Allez dans : Parametres > Applications > Fonctionnalites facultatives > Client OpenSSH" -ForegroundColor Yellow
    Read-Host "Appuyez sur Entree pour fermer"
    exit 1
}

Write-Host "Cible : ${SSH_USER}@${SSH_HOST}:${REMOTE_DIR}" -ForegroundColor Yellow
Write-Host ""

Write-Host "[1/3] Sauvegarde de l'ancien site..." -ForegroundColor Cyan
$BACKUP_DATE = Get-Date -Format "yyyyMMdd_HHmmss"
ssh -p $SSH_PORT -o "StrictHostKeyChecking=accept-new" "${SSH_USER}@${SSH_HOST}" "mkdir -p ${REMOTE_DIR}/_backups && if [ -f '${REMOTE_DIR}/index.html' ]; then tar -czf ${REMOTE_DIR}/_backups/backup_${BACKUP_DATE}.tar.gz -C ${REMOTE_DIR} index.html style.css main.js 2>/dev/null || true; fi"
Write-Host "  OK - Sauvegarde effectuee" -ForegroundColor Green

Write-Host "[2/3] Envoi des fichiers..." -ForegroundColor Cyan
foreach ($file in @("index.html", "style.css", "main.js")) {
    $localPath = Join-Path $LOCAL_DIR $file
    if (-not (Test-Path $localPath)) {
        Write-Host "  ERREUR : fichier manquant : $file" -ForegroundColor Red
        Read-Host "Appuyez sur Entree pour fermer"
        exit 1
    }
    Write-Host "  Envoi : $file" -ForegroundColor Gray
    scp -P $SSH_PORT -o "StrictHostKeyChecking=accept-new" "$localPath" "${SSH_USER}@${SSH_HOST}:${REMOTE_DIR}/"
}
Write-Host "  OK - Fichiers transferes" -ForegroundColor Green

Write-Host "[3/3] Application des permissions..." -ForegroundColor Cyan
ssh -p $SSH_PORT -o "StrictHostKeyChecking=accept-new" "${SSH_USER}@${SSH_HOST}" "chmod 644 ${REMOTE_DIR}/index.html ${REMOTE_DIR}/style.css ${REMOTE_DIR}/main.js"
Write-Host "  OK - Permissions appliquees" -ForegroundColor Green

Write-Host ""
Write-Host "=======================================" -ForegroundColor Green
Write-Host "  Deploiement termine avec succes !    " -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Green
Write-Host ""
Write-Host "  Site en ligne : https://$SSH_HOST" -ForegroundColor Yellow
Write-Host ""
Read-Host "Appuyez sur Entree pour fermer"
