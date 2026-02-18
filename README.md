# 🐺 Westeros Archives - React & TypeScript

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

Une application web immersive développée en **React / TypeScript** permettant d'explorer les personnages de l'univers de *Game of Thrones*. L'application exploite l'API publique *ThronesAPI* et met l'accent sur une UX/UI de très haute qualité (Dark Fantasy, animations fluides, écrans scindés).

🎮 **[👉 VISITER LES ARCHIVES ICI (Live Demo) 👈](https://judoka104.github.io/got-app/)**

---

## ✨ Fonctionnalités Principales

* **Vues Multiples :** Basculez fluidement entre une *Vue Liste* classique, une *Vue Bannières* immersive, et le *Conseil Restreint* (Favoris).
* **Vue Kanban / Bannières :** Un design CSS pur recréant les bannières suspendues des grandes Maisons. Les emblèmes SVG cèdent la place à un aperçu des personnages au survol grâce à un système asymétrique de `transition-delay` (0.2s).
* **Split-View Dynamique :** Au clic sur une Maison, l'interface se scinde via des animations `@keyframes` fluides (`slide-in-left` / `slide-in-right`), affichant un bouclier géant et la grille des effectifs.
* **Moteur de Recherche Global :** Barre de recherche intelligente avec filtrage instantané (`useMemo`) sur l'ensemble des données de l'API.
* **Le Conseil Restreint (Favoris) :** Nommez vos personnages "Mains du Roi" (📌/👑). Ce système de favoris est persistant entre les sessions grâce à un Custom Hook (`useFavorites`) relié au `localStorage`.
* **Modale "Vieux Parchemin" :** Une popup de détails stylisée en document antique (effets d'encre, sceau de cire brisé via CSS pur, ombrages internes).

---

## 🚀 Installation & Développement (Local)

**1. Cloner le dépôt :**
```bash
git clone [https://github.com/JUDOKA104/got-app.git](https://github.com/JUDOKA104/got-app.git)
```
**2. Aller dans le dossier et installer les dépendances :**
```bash
cd got-app && npm install
```
**3. Lancer le serveur local :**
```bash
npm run dev
```

---

## 🛠️ Architecture du Code (Enterprise-grade)

Ce projet illustre de solides pratiques d'architecture front-end :

* **Typage Strict (TypeScript) :** Définition d'interfaces (`Character`, `CharactersByHouse`) pour sécuriser les données issues de l'API externe et éliminer les erreurs de runtime.
* **Custom Hooks & Data Fetching :** Logique d'appel API, de nettoyage des données (fautes de frappes de l'API corrigées à la volée), et de tri automatique par Maisons centralisés dans le hook `useThronesData.ts`.
* **Optimisation des Renders :** Utilisation intensive de `useMemo` pour éviter les recalculs coûteux de l'algorithme de tri lors de la saisie dans la barre de recherche.
* **Composants Isolés :** Découpage ultra-granulaire de l'UI (`<HouseVisualCard />`, `<CharacterModal />`, `<HouseDetailSplit />`) pour une maintenance et une lisibilité parfaites du composant racine.

---
*L'hiver vient, mais le code reste propre.* ❄️