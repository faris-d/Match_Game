var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
$(document).ready(function(){
  var $game = $('#game');
  var cardValues = MatchGame.generateCardValues(values);
  MatchGame.renderCards(cardValues, $game);
});
/*
  Generates and returns an array of matching card values.
 */

// Create an array of all possible card values
var values = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];

MatchGame.generateCardValues = function (values) {
  var cardValues = [], n = values.length, i;
  // While there remain elements to shuffle…
  while (n) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * values.length);
    // If not already shuffled, move it to the new array.
    if (i in values) {
      cardValues.push(values[i]);
      delete values[i];
      n--;
    }
  }
  return cardValues;
};


/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  var cardColors = [
    'hsl(25, 85%, 65%)',
    'hsl(55, 85%, 65%)',
    'hsl(90, 85%, 65%)',
    'hsl(160, 85%, 65%)',
    'hsl(220, 85%, 65%)',
    'hsl(265, 85%, 65%)',
    'hsl(310, 85%, 65%)',
    'hsl(360, 85%, 65%)'
  ];

  $game.empty();
  $game.data('flippedCards', []);

  for (var i = 0; i < cardValues.length; i++ ) {
    var currentValue = cardValues[i];
    var currentColor = cardColors[currentValue-1];
    var cardData = {
      isFlipped: false,
      value: currentValue,
      color: currentColor
    };

    var $currentCard = $('<div class="col-xs-3 card"></div>');
    $currentCard.data(cardData);
    $game.append($currentCard);
  }
  $('.card').click(function() {
    MatchGame.flipCard($(this), $('#game'));
  });
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if ($card.data('isFlipped')) {
    return;
  }

  $card.data('isFlipped', true);
  $card.css('background-color', $card.data('color'));
  $card.text($card.data('value'));

  var flippedCards  = $game.data('flippedCards');
  flippedCards.push($card);

  if (flippedCards.length === 2) {
    if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
      var matchCss = {
        color: 'rgb(204, 204, 204)',
        backgroundColor: 'rgb(153, 153, 153)'
      };
      flippedCards[0].css(matchCss);
      flippedCards[1].css(matchCss);
    } else {
      var card1 = flippedCards[0];
      var card2 = flippedCards[1];
      window.setTimeout(function(){
      card1.css('background-color', 'rgb(32, 64, 86)');
      card1.text('');
      card1.data('isFlipped', false);
      card2.css('background-color', 'rgb(32, 64, 86)');
      card2.text('');
      card2.data('isFlipped', false);
      }, 350);
    }
    $game.data('flippedCards', []);
  }
};
