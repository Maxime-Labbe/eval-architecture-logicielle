# Arena Tournament

## Contributeurs 

Réalisé par Maxime Labbe et Rayane Meyfroot.

## Contraintes 

Nous avons sélectionné les contraintes A et C.

## Choix architecturaux

Nous avons décidé de nous orienter vers une distribution en micro-services notamment pour la contrainte A. Cette distribution nous permettra de déployer nos services unitairement et donc de contrôler les ressources uniquement pour chacun, cela permettra d'attribuer les ressources nécessaires au service de ranking.
Concernant l'architecture, nous nous sommes orientés vers une Clean Architecture, pour cette fois répondre à la contrainte C. Cette architecture nous permet de déclouper la logique métier et applicative des technologies utilisées par notre service. Cela nous permet donc de faire évoluer notre base de données ou notre framework web à notre guise.


## Prérequis

- Node.js 22 ou version ultérieure et npm.

## Installation et démarrage

Depuis les différents services/orchestrateur du projet :

```bash
npm install
npm start
```

Le serveur écoute sur `http://localhost:PORT` avec le `PORT` correspondant que vous pouvez trouver dans le sample.env (il dépend du servvice) . Utiliser `Ctrl+C` pour l'arrêter.

## Procédures de vérification

### Contrainte A

Vous pouvez lancer directement le service de Ranking via le dossier, si jamais il se retrouve déployer il est également possible d'augmenter le nombre d'instances sur lesquels ils tournent, cela ne posera pas de problème puisqu'il s'agit de lecture donc aucune incohérence de transactions.

### Contrainte C

Dans certains services, nous avons mis à disposition des InMemoryRepository vous pouvez les changer librement par une implémentation de base de données, il suffira uniquement de changer le repository importé dans le fichier `server.js` du service. Pour ce qui est du Framework web, il en va de même.

## Limites de l'implémentation

Le choix de la clean architecture semble un peu trop complexe pour une application si simple mais permet de la rendre plus facilement améliorable par la suite. Chaque microservice possède très peu de responsabilité malgré qu'ils soient séparés, cela pourrait entraîner des coûts plus élevés que le monolithe précédemment.