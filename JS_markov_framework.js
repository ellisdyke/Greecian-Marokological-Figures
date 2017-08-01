var descriptions = [ 

"Your variables go here.";,
"the code is optimized for smaller sentences.";,
"it also detects start/end words, which is an option you can modify/ leave out.";,



];

var terminals = {};
var startwords = [];
var wordstats = {};

for (var i = 0; i < descriptions.length; i++) {
    var words = descriptions[i].split(' ');
    terminals[words[words.length-1]] = true;
    startwords.push(words[0]);
    for (var j = 0; j < words.length - 1; j++) {
        if (wordstats.hasOwnProperty(words[j])) {
            wordstats[words[j]].push(words[j+1]);
        } else {
            wordstats[words[j]] = [words[j+1]];
        }
    }
}

var choice = function (a) {
    var i = Math.floor(a.length * Math.random());
    return a[i];
};

var make_description = function (min_length) {
    word = choice(startwords);
    var description = [word];
    while (wordstats.hasOwnProperty(word)) {
        var next_words = wordstats[word];
        word = choice(next_words);
        description.push(word);
        if (description.length > min_length && terminals.hasOwnProperty(word)) break;
    }
    if (description.length < min_length) return make_description(min_length);
    return description.join(' ');
};

$('#generate').on('click', function () {
    var description = make_description(3 + Math.floor(3 * Math.random()));
    $('#generated_description').html(description);
});