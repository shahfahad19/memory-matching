var em = [
    '💐',
    '🌹',
    '🌻',
    '🏵️',
    '🌺',
    '🌴',
    '🌈',
    '🍓',
    '🍒',
    '🍎',
    '🍉',
    '🍊',
    '🥭',
    '🍍',
    '🍋',
    '🍏',
    '🍐',
    '🥝',
    '🍇',
    '🥥',
    '🍅',
    '🌶️',
    '🍄',
    '🧅',
    '🥦',
    '🥑',
    '🍔',
    '🍕',
    '🧁',
    '🎂',
    '🍬',
    '🍩',
    '🍫',
    '🎈',
];

//Shuffling above array
let tmp,
    current,
    previous = em.length;
if (previous)
    while (--previous) {
        current = Math.floor(Math.random() * (previous + 1));
        tmp = em[current];
        em[current] = em[previous];
        em[previous] = tmp;
    }

//Variables
var cardEmoji = '',
    cardID,
    previousCardID = 0,
    turn = 0,
    transform = 'transform',
    flip = 'rotateY(180deg)',
    flipBack = 'rotateY(0deg)',
    time,
    mode,
    numberOfCards,
    remainingCards;

//Resizing Screen
window.onresize = init;
function init() {
    let screenHeight = innerHeight;
    $('body').height(screenHeight + 'px');
    $('#ol').height(screenHeight + 'px');
}

//Showing instructions
window.onload = function () {
    $('#ol').html(
        `<center><div id="inst"><h3>Welcome !</h3>Instructions For Game<br/><br/><li>Make pairs of similiar blocks by flipping them.</li><li>To flip a block you can click on it.</li><li>If two blocks you clicked are not similar, they will be flipped back.</li><p style="font-size:18px;">Click one of the following mode to start the game.</p></div><button onclick="start(3, 4)">3 x 4</button> <button onclick="start(4, 4)" style="w">4 x 4</button><button onclick="start(4, 5)">4 x 5</button><button onclick="start(5, 6)">5 x 6</button><button onclick="start(6, 6)">6 x 6</button></center>`
    );
};

//Starting the game
function start(rows, columns) {
    //Timer and moves
    (min = 0), (sec = 0), (moves = 0);
    $('#time').html('Time: 00:00');
    $('#moves').html('Moves: 0');
    time = setInterval(function () {
        sec++;
        if (sec == 60) {
            min++;
            sec = 0;
        }
        if (sec < 10) $('#time').html('Time: 0' + min + ':0' + sec);
        else $('#time').html('Time: 0' + min + ':' + sec);
    }, 1000);

    remainingCards = (rows * columns) / 2;

    numberOfCards = remainingCards;

    mode = rows + 'x' + columns;

    //Generating item array
    var items = [];
    for (let i = 0; i < numberOfCards; i++) items.push(em[i]);
    for (let i = 0; i < numberOfCards; i++) items.push(em[i]);

    // shuffling the array
    let tmp,
        current,
        previous = em.length;
    if (previous)
        while (--previous) {
            current = Math.floor(Math.random() * (previous + 1));
            tmp = em[current];
            em[current] = em[previous];
            em[previous] = tmp;
        }

    //Creating table
    $('table').html('');
    var cardId = 1;
    for (let i = 1; i <= rows; i++) {
        $('table').append('<tr>');
        for (let j = 1; j <= columns; j++) {
            $('table').append(
                `<td id='${cardId}' onclick="change(${cardId})"><div class='inner'><div class='front'></div><div class='back'><p>${
                    items[cardId - 1]
                }</p></div></div></td>`
            );
            cardId++;
        }
        $('table').append('</tr>');
    }

    //Hiding instructions screen
    $('#ol').fadeOut(500);
}

//Function for flipping blocks
function change(clickedCardId) {
    //Variables
    let card = '#' + clickedCardId + ' .inner';
    let cardFront = '#' + clickedCardId + ' .inner .front';
    let cardBack = '#' + clickedCardId + ' .inner .back';

    //Dont flip for these conditions
    if (turn == 2 || $(card).attr('flip') == 'block' || previousCardID == clickedCardId) {
        // Don't flip
    }

    //Flip
    else {
        $(card).css(transform, flip);
        if (turn == 1) {
            //This value will prevent spam clicking
            turn = 2;

            //If both flipped blocks are not same
            if (cardEmoji != $(cardBack).text()) {
                setTimeout(function () {
                    $(cardID).css(transform, flipBack);
                    $(card).css(transform, flipBack);
                    previousCardID = 0;
                }, 1000);
            }

            //If blocks flipped are same
            else {
                remainingCards--;
                $(card).attr('flip', 'block');
                $(cardID).attr('flip', 'block');
            }

            setTimeout(function () {
                turn = 0;
                //Increase moves
                moves++;
                $('#moves').html('Moves: ' + moves);
            }, 1150);
        } else {
            // Get card emoji and save it in this variable to check with next card clicked
            cardEmoji = $(cardBack).text();

            // Save this card id to previousCardID variable
            previousCardID = clickedCardId;

            cardID = '#' + clickedCardId + ' .inner';
            turn = 1;
        }

        // If all pairs are matched
        if (remainingCards == 0) {
            clearInterval(time);
            if (min == 0) {
                time = `${sec} seconds`;
            } else {
                time = `${min} minute(s) and ${sec} second(s)`;
            }
            setTimeout(function () {
                $('#ol').html(
                    `<center><div id="iol"><h2>Congrats!</h2><p style="font-size:23px;padding:10px;">You completed the ${mode} mode in ${moves} moves. It took you ${time}.</p><br/>Play Again ?</p><button onclick="start(3, 4)">3 x 4</button> <button onclick="start(4, 4)" style="w">4 x 4</button><button onclick="start(4, 5)">4 x 5</button><button onclick="start(5, 6)">5 x 6</button><button onclick="start(6, 6)">6 x 6</button></div></center>`
                );
                $('#ol').fadeIn(750);
            }, 1500);
        }
    }
}
