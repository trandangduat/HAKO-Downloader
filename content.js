chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.command == "fetch") {
		var vols = document.getElementsByClassName("volume-list");
		const names = [];
		for (i = 0; i < vols.length; i++) {
			var vol_name = vols[i].getElementsByClassName('sect-title')[0].textContent;
			names.push(vol_name);
		}
		sendResponse({
			volNames: names
		});
	}
	if (request.command == "userOption") {
		var chosen = request.chosen;
		handle(chosen);
	}
});


function download (htmlContent, filename) {
	var link = document.body.appendChild(document.createElement("a"));
	link.download = filename + ".html";
	link.href = 'data:text/html' + ';charset=utf-8,' + encodeURIComponent(htmlContent);
	link.click();
	link.remove();
}

function handle (chosen) {
	// alert(chosen);
    var vols = document.getElementsByClassName("volume-list");
    for (__ = 0; __ < chosen.length; __++) {
        var i = chosen[__];
        var chapters = vols[i].getElementsByClassName('chapter-name');
       	// download
       	for (j = 0; j < chapters.length; j++) {
       		var url = chapters[j].getElementsByTagName('a')[0].href;
       		$.get(url, function(html) {
			    var $mainContent = $(html).find('.reading-content');
			    var $contentVolume = $(html).find('.reading-content h2.title-item'); 
			    var $contentTitle = $(html).find('.reading-content h4.title-item');
				download($mainContent.html(), $contentVolume.text() + " - " + $contentTitle.text());	
				return false;
			});
       	}
    }
}

function isLetter(char) {return (/[a-zA-Z]/).test(char)}
function isNum(val){return !isNaN(val)}

function modify (s) {
    var words = s.split(" ");
    s = "";
    for (i = 0; i < words.length; i++) {
        if (isLetter(words[i][0]) || isNum(words[i][0])) {
            s += words[i] + " ";
        }
    }
    s = s.slice(0, -1);
    return s.replace(/^\s+|\s+$/g, '').toUpperCase();
}