/**
 * Main app function
 */
(function ($) {
  var APP = {};

  APP.init = function () {
    APP.executePartA();
    APP.executePartB();
  };

  APP.executePartA = function () {
    var word = 'game',
      i = 0,
      marker = 0,
      result = [];

    // first grow the letters
    for (i; i < word.length; i++) {
      for (marker; marker <= i; marker++) {
        result.push(word.substring(0, marker + 1));
      }
    }

    // now shrink them
    marker = 1;
    for (marker; marker < i; marker++) {
      result.push(word.substring(marker, word.length));
    }

    // spit out the result
    $('#partA-result').text(result.join(', '));
  };

  APP.executePartB = function () {
    var completionList = [],
      $autocompleteContainer = $('#autocomplete-container'),
      statesList = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

    // set a click event handler for all dynamic autocomplete spans
    $('body').on('click', 'span.completion-entry', function (e) {
      $('#text-input').val($(e.target).text());
      $autocompleteContainer.hide();
    });

    // set a keyup event handler for the input
    $('#text-input').on('keyup', function (e) {
      var inputVal = $(e.target).val();

      // clear it out to build a new one
      completionList.length = 0;

      // if the input is not empty look for matches
      if (inputVal) {
        $(statesList).each(function (index, state) {
          // check if the state starts with the inputVal ignoring case
          var matcher = new RegExp('^' + inputVal, 'i'),
            isMatch = state.search(matcher) !== -1;
          if (isMatch && $.inArray(state, completionList) === -1) {
            completionList.push(state);
          }
        });
      } else {
        completionList.length = 0;
      }

      // if there's any completion values, add them
      if (completionList.length) {
        $autocompleteContainer.find('ul').empty();
        $(completionList).each(function (index, val) {
          var $listEntry = $('<li><span class="completion-entry">' + val + '</span></li>');
          $autocompleteContainer.find('ul').append($listEntry);
          $autocompleteContainer.show();
        });
      } else {
        $autocompleteContainer.hide();
      }
    });
  };

  /**
   * Initialize the app
   */
  $(document).ready(function () {
    APP.init();
  });
}(jQuery));