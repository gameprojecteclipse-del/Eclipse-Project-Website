# Eclipse & Chroma Studios — Web Portal

Bienvenue sur le dépôt officiel du portail web "Double-Porte" (Crossroads) pour le projet **Eclipse** et l'agence créative **Chroma Studios**. Ce projet est une expérience immersive en deux volets, offrant aux utilisateurs le choix de plonger dans l'univers sombre et mythologique du jeu vidéo *Eclipse*, ou d'explorer les services professionnels de production visuelle de *Chroma Studios*.

## 🌟 Le Concept

Ce site web a été conçu avec une architecture unique de "Portail Double" (Double-Door) sur sa page d'accueil :
- **Portail Eclipse :** Redirige vers une vitrine de jeu vidéo Dark Fantasy/Cosmico-Fantasy. Il présente le lore (La Fracture, Le Présage, etc.), les mécaniques de boucle de gameplay (Extraction, Mutation, Résonance), une galerie d'art interactive et la roadmap du projet jusqu'à la démo Q1 2027.
- **Portail Chroma :** Dirige vers l'identité "Corporate" de l'agence créative (Direction Artistique, Installations Immersives, Cinéma & Vidéo, Design Éditorial) avec une identité visuelle distincte mais complémentaire.

## 🛠️ Technologies Utilisées

Ce projet a été développé en mettant l'accent sur les performances, l'animation fluide et l'expérience utilisateur (UX) :
- **React (Vite) :** Pour un rendu ultra-rapide et une architecture basée sur des composants.
- **TypeScript :** Pour un code robuste, typé et maintenable.
- **Tailwind CSS :** Pour un design ultra-réactif (Responsive Design) et des utilitaires de style modulaires.
- **Framer Motion :** Le moteur derrière toutes les animations avancées du site, incluant l'animation dynamique du double-portail, les transitions de page et le défilement de contenu.
- **i18next :** Pour une gestion bilingue parfaite (Français / Anglais).
- **Lucide React :** Pour l'iconographie minimaliste.

## 🚀 Fonctionnalités Clés

- **Accueil "Crossroads" Interactif :** Écran partagé (50/50) avec des transitions d'élargissement basées sur des états React fluides (sans saccades de re-calcul CSS).
- **Galerie d'Art Immersive :** Système de carrousel interactif avec description dynamique en fonction de l'image visionnée.
- **Sticky Sections :** Effets de défilement où le fond d'écran s'adapte dynamiquement lors de la navigation des services Chroma Studios.
- **Internationalisation :** Traductions dynamiques gérées par un switch de langue en haut à droite.

## 📦 Installation et Lancement Local

Pour cloner et exécuter ce projet sur votre propre machine :

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/gameprojecteclipse-del/Eclipse-Project-Website.git
   ```
2. Accédez au répertoire du projet :
   ```bash
   cd Eclipse-Project-Website
   ```
3. Installez les dépendances :
   ```bash
   npm install
   ```
4. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```

Le site sera accessible via `http://localhost:8080` (le port peut varier).

---

*Développé pour l'équipe du projet Eclipse & Chroma Studios.*
