//donnees fournies
const calendrierMatchs = [{
        id: 'LFL_KC_SLY',
        jeu: 'League of Legends',
        competition: 'LFL',
        equipeA: 'Karmine Corp',
        equipeB: 'Solary',
        probabiliteA: 0.65, // 65% de chance pour KC
        statut: 'À venir'
    },
    {
        id: 'VCT_VIT_M8',
        jeu: 'Valorant',
        competition: 'VCT EMEA',
        equipeA: 'Team Vitality',
        equipeB: 'Mandatory',
        probabiliteA: 0.55, // 55% de chance pour Vitality
        statut: 'À venir'
    },
    {
        id: 'LFL_GO_BDS',
        jeu: 'League of Legends',
        competition: 'LFL',
        equipeA: 'Gentle Mates',
        equipeB: 'BDS Academy',
        probabiliteA: 0.48, // 48% de chance pour M8, donc BDS est favori
        statut: 'À venir'
    },
    {
        id: 'LFL_KC_M8',
        jeu: 'Valorant',
        competition: 'VCT EMEA',
        equipeA: 'Karmine Corp',
        equipeB: 'Mandatory',
        probabiliteA: 0.52,
        statut: 'À venir'
    }
];

// Étape 1 
// Modéliser les données avec la fonction constructeur Match
function Match(id, jeu, competition, equipeA, equipeB, probabiliteA, statut) {
    this.id = id;
    this.jeu = jeu;
    this.competition = competition;
    this.equipeA = equipeA;
    this.equipeB = equipeB;
    this.probabiliteA = probabiliteA;
    this.statut = statut;
    this.resultat = null; // stockera le gagnant après simulation
}

//cette partie est pour déterminer le favori du match
Match.prototype.getFavori = function() {
    if (this.probabiliteA > 0.5) {
        return this.equipeA;
    } else {
        return this.equipeB;
    }
};

// cette partie la "classe" Plateforme est pour gérer tous les matchs
function Plateforme(nom) {
    this.nom = nom;
    this.matchs = [];
}

// Charger les matchs depuis le calendrier deja fourni
Plateforme.prototype.chargerMatchs = function(matchsACharger) {
    var self = this;
    matchsACharger.forEach(function(matchObj) {
        var match = new Match(
            matchObj.id,
            matchObj.jeu,
            matchObj.competition,
            matchObj.equipeA,
            matchObj.equipeB,
            matchObj.probabiliteA,
            matchObj.statut
        );
        self.matchs.push(match);
    });
};

// Méthode pour afficher le calendrier des matchs
Plateforme.prototype.afficherCalendrier = function() {
    this.matchs.forEach(function(match) {
        console.log(
            "[" + match.competition + "] " + match.equipeA + " vs. " + match.equipeB + " - Jeu: " + match.jeu
        );
    });
};

// Récupérer les matchs d’un jeu précis
Plateforme.prototype.getMatchsParJeu = function(jeu) {
    return this.matchs.filter(function(match) {
        return match.jeu === jeu;
    });
};

// Récupérer les matchs "serrés" (probabilités entre 0.45 et 0.55)
Plateforme.prototype.getMatchsRisques = function() {
    return this.matchs.filter(function(match) {
        return match.probabiliteA >= 0.45 && match.probabiliteA <= 0.55;
    });
};

// Trouver le match avec son ID
Plateforme.prototype.getMatchById = function(id) {
    return this.matchs.find(function(match) {
        return match.id === id;
    });
};

// bonus
// simuler le résultat d’un match 
Plateforme.prototype.simulerResultat = function(idMatch) {
    var match = this.getMatchById(idMatch);
    if (!match) {
        console.log("Match introuvable");
        return;
    }
    if (match.statut === "Terminé") {
        console.log("Match déjà terminé !");
        return;
    }

    // Simulation avec probabilité en tirant un nombre aléatoire
    var hasard = Math.random();
    var gagnant;
    if (hasard < match.probabiliteA) {
        gagnant = match.equipeA;
    } else {
        gagnant = match.equipeB;
    }

    match.statut = "Terminé";
    match.resultat = gagnant;

    console.log("Résultat simulé : " + match.equipeA + " vs " + match.equipeB + " → Gagnant : " + gagnant);
};

// calculer les statistiques d’une équipe
Plateforme.prototype.getStatsEquipe = function(nomEquipe) {
    var matchsJoues = this.matchs.filter(function(match) {
        return match.statut === "Terminé" &&
            (match.equipeA === nomEquipe || match.equipeB === nomEquipe);
    });

    var victoires = matchsJoues.filter(function(match) {
        return match.resultat === nomEquipe;
    });

    return {
        equipe: nomEquipe,
        matchsJoues: matchsJoues.length,
        victoires: victoires.length,
        tauxVictoire: matchsJoues.length > 0 ?
            ((victoires.length / matchsJoues.length) * 100).toFixed(1) + "%" : "0%"
    };
};

// ==================== TESTS ====================

// On crée la plateforme
var esportVision = new Plateforme("Esport Vision");

// On charge les matchs
esportVision.chargerMatchs(calendrierMatchs);

// On affiche tout le calendrier
esportVision.afficherCalendrier();

// Test des méthodes d’analyse
console.log("➡️ Matchs Valorant :", esportVision.getMatchsParJeu("Valorant"));
console.log("➡️ Matchs serrés :", esportVision.getMatch)