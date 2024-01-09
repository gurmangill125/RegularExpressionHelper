
// script.js
var historyItems = [];

function addToHistory(regex, input) {
    historyItems.push({ regex, input });
}

document.getElementById('run-btn').addEventListener('click', function() {
    var regexInput = document.getElementById('regex-input').value;
    var stringInput = document.getElementById('string-input').value;
    var flags = document.getElementById('flags').value;
    var functionChoice = document.getElementById('functions').value;
    var resultContainer = document.getElementById('result');
    var highlightedResultContainer = document.getElementById('highlighted-result');
    var performanceContainer = document.getElementById('performance');
    var historyList = document.getElementById('history-list');


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
        var startTime = performance.now();

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

        var endTime = performance.now();
        var timeTaken = endTime - startTime;
        performanceContainer.innerText =  `Execution time: ${timeTaken.toFixed(6)} milliseconds: Please note that execution time may vary depending on various factors including browser activity and system load. Use these metrics as rough estimates for optimizing your regular expressions.`;


        // Highlight matches in the string only if the function is 'match'
        if (functionChoice === 'match' && result) {
            var highlightedString = stringInput.replace(regex, function(match) {
                return '<span class="highlight">' + match + '</span>';
            });
            highlightedResultContainer.innerHTML = highlightedString;
        }

        addToHistory(regexInput, stringInput);
        updateHistoryList(); 

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

// Function to update the history list
function updateHistoryList() {
    var historyList = document.getElementById('history-list');
    historyList.innerHTML = '';

    // Iterate through the historyItems array and add items to the list
    historyItems.forEach(function(item, index) {
        var li = document.createElement('li');
        li.textContent = `History ${index + 1}: Regex - "${item.regex}", Input - "${item.input}"`;
        historyList.appendChild(li);
    });
}
