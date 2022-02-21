document.addEventListener('DOMContentLoaded', function () {  
    function communicate () {
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {command: "fetch"}, fetching);
        })
    }

    communicate();

    function fetching (res) {
        var card;
        for (i = 0; i < res.volNames.length; i++) {
            card = document.createElement('div');
            card.classList.add('card');
            card.addEventListener("click", function() {
                if (this.getAttribute('id') == 'chosen') {
                    this.removeAttribute('id');
                } else {
                    this.setAttribute('id', 'chosen');
                }
            });
            card.textContent = res.volNames[i];
            document.querySelector('#volumes').appendChild(card);
        }
    }

    // select/deselect all volumes
    document.querySelector('#choice-toggle .select-all').addEventListener("click", function() {
        var all = document.getElementsByClassName('card');
        for (i = 0; i < all.length; i++) {
            if (all[i].getAttribute('id') != 'chosen') {
                all[i].setAttribute('id', 'chosen');
            }
        }
    });

    document.querySelector('#choice-toggle .deselect-all').addEventListener("click", function() {
        var all = document.getElementsByClassName('card');
        for (i = 0; i < all.length; i++) {
            if (all[i].getAttribute('id') == 'chosen') {
                all[i].removeAttribute('id');
            }
        }
    });

    // send chosen volumes to content.js 
    document.querySelector("#download #btn").addEventListener("click", downloader);
    function downloader() {
        var total = document.getElementsByClassName('card');
        var chosen = [];
        for (i = 0; i < total.length; i++) {
            if (total[i].getAttribute('id') == 'chosen') {
                chosen.push(i);
            }
        }
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {command: "userOption", chosen: chosen});
        })
    }

}, false)

