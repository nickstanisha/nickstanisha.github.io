var starters = ['aa', 'ab', 'ad', 'ae', 'ag', 'ah', 'ai', 'al', 'am', 'an', 'ar', 'as', 'at', 
                'aw', 'ax', 'ay', 'ba', 'be', 'bi', 'bo', 'by', 'de', 'do', 'ed', 'ef', 'eh', 'el', 
                'em', 'en', 'er', 'es', 'et', 'ex', 'fa', 'fe', 'go', 'ha', 'he', 'hi', 'hm', 'ho', 
                'id', 'if', 'in', 'is', 'it', 'jo', 'ka', 'ki', 'la', 'li', 'lo', 'ma', 'me', 'mi', 
                'mm', 'mo', 'mu', 'my', 'na', 'ne', 'no', 'nu', 'od', 'oe', 'of', 'oh', 'oi', 'om', 
                'on', 'op', 'or', 'os', 'ow', 'ox', 'oy', 'pa', 'pe', 'pi', 'qi', 're', 'sh', 'si', 
                'so', 'ta', 'ti', 'to', 'uh', 'um', 'un', 'up', 'us', 'ut', 'we', 'wo', 'xi', 'xu', 
                'ya', 'ye', 'yo', 'za'];

function button(word) {
  return `<button type="button" class="btn btn-default" value="${word}">${word}</button>`;
}

function update_divs(selection, word_graph) {
  var word = $(selection).val()
  if (word.length < 9) {
    var neighbors = word_graph[word];
    var div_contents = '';
    for (i in neighbors) {
      div_contents += button(neighbors[i]);
    }
    $(`#${word.length + 1}-letter-words`).html(div_contents);
    for (i=word.length + 2; i <= 9; i++) {
      $(`#${i}-letter-words`).empty();
    }
  }
}

$(document).ready(function(){
  var word_graph = {};
  $.ajax({
    url: "https://nickstanisha.github.io/data/scrabble/word_graph.json",
    dataType: 'json',
    success: function (data) {
      word_graph = data;
    }
  });

  var content = '';
  for (i=0; i<starters.length; i++){
    content += button(starters[i]);
  }
  $("#2-letter-words").html(content);

  $("#word-explorer").on('click', '.btn-default', function(){
    if (!$(this).hasClass("active")) {
      $(this).parent().find(".btn").removeClass("active");
      $(this).addClass("active");
      update_divs(this, word_graph);
    }
  });
});