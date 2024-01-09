
// script.js
document.getElementById('run-btn').addEventListener('click', function() {
    var regexInput = document.getElementById('regex-input').value;
    var stringInput = document.getElementById('string-input').value;
    var flags = document.getElementById('flags').value;
    var functionChoice = document.getElementById('functions').value;
    var resultContainer = document.getElementById('result');
    var highlightedResultContainer = document.getElementById('highlighted-result');

    if (!regexInput) {
        alert('Please enter a regular expression.');
        return;
    }

    if (!stringInput) {
        alert('Please enter a string.');
        return;
    }

    try {
        var regex = new RegExp(regexInput, flags);
        var result;

        // Clear previous results
        resultContainer.innerText = '';
        highlightedResultContainer.innerHTML = '';

        switch (functionChoice) {
            case 'test':
                result = regex.test(stringInput);
                resultContainer.innerText = result ? "True" : "False";
                break;
            case 'search':
                result = stringInput.search(regex);
                resultContainer.innerText = `Position: ${result}`;
                break;
            case 'match':
                result = stringInput.match(regex);
                resultContainer.innerText = result ? result.join(', ') : "No match";
                break;
        }

        // Highlight matches in the string only if the function is 'match'
        if (functionChoice === 'match' && result) {
            var highlightedString = stringInput.replace(regex, function(match) {
                return '<span class="highlight">' + match + '</span>';
            });
            highlightedResultContainer.innerHTML = highlightedString;
        }

    } catch(e) {
        alert('Invalid regular expression');
    }
});

// Dark Mode Toggle
document.getElementById('dark-mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
    
});

// Cheat Sheet Toggle
document.getElementById('show-cheat-sheet').addEventListener('click', function() {
    var cheatSheet = document.getElementById('cheat-sheet');
    if (cheatSheet.style.display === 'none' || cheatSheet.style.display === '') {
        cheatSheet.style.display = 'block';
    } else {
        cheatSheet.style.display = 'none';
    }
});
