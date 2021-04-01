// Tableau des cartes séléectionnées
let cardsSelected = [];
let nbChances;
let score = 0;
let pairFound = 0;

// Génération de l'ID Player
const generateIdPlayer = function () {
    // Return Random number...
    return Math.floor((Math.random() * 1000) + 1); // Random number between 1 and 10000
};

// Fonction checkWin
const checkWin = function() {
    if (pairFound == 5) {
        if (score > 0) {
            alert('Score : ' + score + ' | Vous avez gagné, pas mal le score !!!');
        } else if (score == 0) {
            alert('Score : ' + score + ' | Votre score est de 0 la tête à toto !!!');
        } else {
            alert('Score : ' + score + ' | Cela se passe de commentaires je pense avec un score pareil');
        }

        setTimeout(location.reload(), 500);
    }
};

// Function checkImage
const checkImage = function (event) {
    // Get masque
    const masque = event.target;

    // Get image
    const prev = event.target.previousSibling;
    
    // On popule le talbeau avec la carte courante
    cardsSelected.push({ "id": prev.parentElement.id, "alt": prev.alt });
    
    // On change les classes
    if (prev.className == 'img-thumbnails masque') {
        prev.className = 'img-thumbnails';
        masque.className = 'img-thumbnails masque';
    }

    // Si l'on à dévoilé deux images
    if (cardsSelected.length == 2) {
        // Petite temporisation
        setTimeout(function () {
            // Si les deux images sont identitques
            if (cardsSelected[0].alt == cardsSelected[1].alt) {
                // Ajouter +10 au score
                score = score + 10;
                pairFound = pairFound + 1;
            } else {
                // Enlever une chance
                nbChances = nbChances - 1;
                score = score - 10;    

                // On change la visibilité
                document.querySelector('#' + cardsSelected[0].id).firstChild.className = 'img-thumbnails masque';
                document.querySelector('#' + cardsSelected[0].id).lastChild.className = 'img-thumbnails';
                document.querySelector('#' + cardsSelected[1].id).firstChild.className = 'img-thumbnails masque';
                document.querySelector('#' + cardsSelected[1].id).lastChild.className = 'img-thumbnails';
            }

            // Réinitialiser le tableau
            cardsSelected = [];

            // Réaffichage
            $('#score').text(score);
            $('#nbChances').text(nbChances);

            // On check to win ^^
            checkWin();

        }, 300);
    }
};

// Function to Add cards of the memory
const addCardsOfTheMemory = function (pictures) {
    // On mélange le tableau des pictures
    const randomPictures = pictures.sort(() => Math.random() * 1000 - Math.random() * 1000);

    // On ajoute les images dans le tableau
    $('#memory-cards').append($('<table></table>'));
    $('#memory-cards > table').append($('<tr></tr>'));
    // Première ligne
    for (let i = 0; i < randomPictures.length / 2; i++) {
        $('#memory-cards > table').first().append($('<td id=card-' + i + '><img class="img-thumbnails masque" src="resources/img/png/' + randomPictures[i] + '.png" alt="' + randomPictures[i] + '" /><img class="img-thumbnails" src="resources/img/png/mystery.png" /></td>'));
        $('#card-' + i + " img:last-child").on('click', function (event) {
            checkImage(event);
        });
    }
    // Deuxième ligne
    $('#memory-cards > table').append($('<tr></tr>'));
    for (let i = randomPictures.length / 2; i < randomPictures.length; i++) {
        $('#memory-cards > table').last().append($('<td id=card-' + i + '><img class="img-thumbnails masque" src="resources/img/png/' + randomPictures[i] + '.png" alt="' + randomPictures[i] + '" /><img class="img-thumbnails" src="resources/img/png/mystery.png" /></td>'));
        $('#card-' + i).first().on('click', function (event) {
            checkImage(event);
        });
    }
};

// Function to Add response data API in the DOM
const addDatasInTheDom = function (response) {
    // Show title game
    $('header').append($('<h2>' + response.gameName + '</h2>'));

    // Show the level game
    $('header').append($('<h3>Game level : ' + response.levelGame + '</h3>'));

    // Show the id player
    $('header').append($('<h4>ID Player : #' + generateIdPlayer() + '</h4>'));

    // Show number of chances
    $('header').append($('<h5>Numbers of chances : ' + response.numbersOfChances + ' Chances</h5>'));

    // Afficher chances restantes
    nbChances = response.numbersOfChances;
    $('header').append($('<h5>Chances restantes : <span id="nbChances">' + nbChances + '</span> Chances restantes</h5>'));

    // Add memory cards
    addCardsOfTheMemory(response.pictures);
};

// Function callAPI
const callAPI = function (onSuccess) {
    // Fake API
    const response = {
        "gameName": "My Memory",
        "levelGame": "Easy",
        "numbersOfChances": 20,
        "pictures": [
            'rond',
            'carre',
            'triangle',
            'losange',
            'etoile',
            'rond',
            'carre',
            'triangle',
            'losange',
            'etoile'
        ],
    };
    // Success response of the fake API
    onSuccess(response);
};

// DOM is load
$(function () {
    // Call API
    callAPI(addDatasInTheDom);
});