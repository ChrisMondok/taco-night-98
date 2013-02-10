function showPopup(element)
{
	return;
	element.style.display = 'block';
	setTimeout(function(){this.classList.remove('hidden')}.bind(element),1);
}

function hidePopup(element)
{
	element.classList.add('hidden')
	setTimeout(function(){this.style.display = 'none'}.bind(element),1000);
}

function addChatMessage(message)
{
	var chat = document.getElementById('chat');
	chat.innerText = message+"\n"+chat.innerText;
}

function addDebugMessage(message,level)
{
	var level = (level || "DEBUG").toLowerCase();
	var chat = document.getElementById('chat');
	chat.innerHTML = '<span class="logentry">'+
		'<span class="date">'+
		new Date().toLocaleTimeString()+
		'</span> <span class="loglevel '+level+'">['+level.toUpperCase()+']</span> '+
		message +
		'</span><br/>' +
		chat.innerHTML;
}
