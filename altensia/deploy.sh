#!/bin/bash
# =============================================
#  ALTENSIA — Script de déploiement SSH
#  Usage : bash deploy.sh
# =============================================

set -e  # Arrête le script en cas d'erreur

# ──────────────────────────────────────────────
#  CONFIGURATION — À remplir avant de lancer
# ──────────────────────────────────────────────
SSH_USER="votre_utilisateur"       # ex: hamid ou root
SSH_HOST="votre-serveur.fr"        # ex: 51.210.xxx.xxx ou altensia.fr
SSH_PORT="22"                      # Port SSH (22 par défaut)
SSH_KEY="~/.ssh/id_rsa"            # Chemin vers votre clé SSH (ou laissez vide pour mot de passe)
REMOTE_DIR="/var/www/html"         # Répertoire cible sur le serveur
LOCAL_DIR="./altensia"             # Répertoire local contenant les fichiers du site
# ──────────────────────────────────────────────

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  ALTENSIA — Déploiement SSH automatique ${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Vérification de la config
if [ "$SSH_USER" = "votre_utilisateur" ] || [ "$SSH_HOST" = "votre-serveur.fr" ]; then
  echo -e "${RED}✗ Erreur : veuillez renseigner SSH_USER et SSH_HOST dans le script avant de continuer.${NC}"
  exit 1
fi

# Vérification des fichiers locaux
if [ ! -d "$LOCAL_DIR" ]; then
  echo -e "${RED}✗ Erreur : le dossier '$LOCAL_DIR' est introuvable. Assurez-vous que le zip a été décompressé.${NC}"
  exit 1
fi

echo -e "${YELLOW}→ Cible : ${SSH_USER}@${SSH_HOST}:${REMOTE_DIR}${NC}"
echo ""

# Construction des options SSH
SSH_OPTS="-p ${SSH_PORT} -o StrictHostKeyChecking=accept-new"
if [ -n "$SSH_KEY" ] && [ "$SSH_KEY" != "" ]; then
  SSH_OPTS="$SSH_OPTS -i $SSH_KEY"
fi

# ── ÉTAPE 1 : Test de connexion ──
echo -e "${BLUE}[1/4] Test de la connexion SSH...${NC}"
if ssh $SSH_OPTS "${SSH_USER}@${SSH_HOST}" "echo ok" > /dev/null 2>&1; then
  echo -e "${GREEN}  ✓ Connexion réussie${NC}"
else
  echo -e "${RED}  ✗ Impossible de se connecter. Vérifiez vos identifiants et que le serveur est joignable.${NC}"
  exit 1
fi

# ── ÉTAPE 2 : Sauvegarde de l'ancien site ──
echo -e "${BLUE}[2/4] Sauvegarde de l'ancien site (si existant)...${NC}"
BACKUP_DATE=$(date +%Y%m%d_%H%M%S)
ssh $SSH_OPTS "${SSH_USER}@${SSH_HOST}" "
  if [ -f '${REMOTE_DIR}/index.html' ]; then
    mkdir -p ${REMOTE_DIR}/_backups
    tar -czf ${REMOTE_DIR}/_backups/backup_${BACKUP_DATE}.tar.gz \
      -C ${REMOTE_DIR} index.html style.css main.js 2>/dev/null || true
    echo 'backup_ok'
  else
    echo 'no_previous_site'
  fi
"
echo -e "${GREEN}  ✓ Sauvegarde effectuée dans ${REMOTE_DIR}/_backups/${NC}"

# ── ÉTAPE 3 : Envoi des fichiers ──
echo -e "${BLUE}[3/4] Envoi des fichiers vers le serveur...${NC}"

SCP_OPTS="-P ${SSH_PORT} -o StrictHostKeyChecking=accept-new"
if [ -n "$SSH_KEY" ] && [ "$SSH_KEY" != "" ]; then
  SCP_OPTS="$SCP_OPTS -i $SSH_KEY"
fi

scp $SCP_OPTS \
  "${LOCAL_DIR}/index.html" \
  "${LOCAL_DIR}/style.css" \
  "${LOCAL_DIR}/main.js" \
  "${SSH_USER}@${SSH_HOST}:${REMOTE_DIR}/"

echo -e "${GREEN}  ✓ Fichiers transférés${NC}"

# ── ÉTAPE 4 : Permissions & vérification ──
echo -e "${BLUE}[4/4] Application des permissions...${NC}"
ssh $SSH_OPTS "${SSH_USER}@${SSH_HOST}" "
  chmod 644 ${REMOTE_DIR}/index.html ${REMOTE_DIR}/style.css ${REMOTE_DIR}/main.js
  echo 'permissions_ok'
"
echo -e "${GREEN}  ✓ Permissions appliquées (644)${NC}"

# ── RÉSUMÉ ──
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  ✓ Déploiement terminé avec succès !${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "  Site en ligne → ${YELLOW}https://${SSH_HOST}${NC}"
echo -e "  Sauvegarde    → ${REMOTE_DIR}/_backups/backup_${BACKUP_DATE}.tar.gz"
echo ""
