
/*
Add the page action icon when a new tab becomes active
*/
browser.tabs.onUpdated.addListener((activeInfo) => {
	var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
	gettingActiveTab.then((tabs) => {
		browser.pageAction.show(tabs[0].id);
	});
});

/*
On page action click, post that link to 
*/
browser.pageAction.onClicked.addListener(() => {
	var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
	gettingActiveTab.then((tabs) => {
		var tab = tabs[0];
		var markdownLink = "["+tab.title+"]("+tab.url+")";
		var date = new Date();
		var dateString = date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
		console.log(dateString);
		var jsonLink = {};
		jsonLink[dateString] = { "text": markdownLink, "born": Date.now() };
		console.log(JSON.stringify(jsonLink));
		$.ajax({
			url:"https://99.117.186.91/pimp/append/5fbaf42e8b3d8e41f99d8316",
			type:"PUT",
			contentType: "application/json",
			data:JSON.stringify(jsonLink),
    		dataType: "json",
			success: function(data) {
				console.log("POSTED");
				browser.notifications.create({
					"type": "basic",
					"iconUrl": browser.extension.getURL("icons/pimp.png"),
					"title": "Posted to P.I.M.P.",
					"message": tab.title
				});
			}
		});
	});
});
