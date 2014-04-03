var oCats = {
	"New Product":"New Products",
	"Executive Activity":"Executive Activities",
	"Executive Quote":"Executive Quotes",
	"New Alliance":"New Alliances",
	"Regulation Or Litigation":"Regulations And Litigations",
	"General Industry":"General Industry"
};

function parseNews(xml,companyDiv,companyName) {
	var dict = [];
	$.each(oCats,function(key,val){
		storyCat = val.toLowerCase();
		storyCat = storyCat.split(" ");
		storyCat = storyCat[storyCat.length-1];
		relevantStories = $(xml).find("NewsDetails").has('CategoryText:contains("'+key+'")');
		if(relevantStories.length>0) { $(companyDiv).append("<div class=\"row\"><div class=\"col-sm-12\"><h3 class=\"cat-title-"+storyCat+"\">"+companyName + ": "+val+"</h3></div></div>"); }
		var count = 1;
		relevantStories.each(function(i,ival){
			var theTitle = $(ival).find("TitleText").text();
			if($.inArray(theTitle,dict)==-1) { //add && i < 10 or whatever here if need be
				var story = $(ival);
				var theDate = story.find("PublishedDateTimestamp").text();
				theDate = new Date(theDate);
				var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
				theDate = monthNames[theDate.getMonth()] + " " + theDate.getDay();
				var theSource = story.find("SourceDescription").text();
				var theLink = story.find("WebPageURL").text();
				var theContent = story.find("ContentText").text();
				if(count<4) { //story with summary
					buildStoryHTML(count,theTitle,theDate,theSource,theLink,theContent,companyDiv,companyName,storyCat);	
				}
				else { //headline only
					buildHeadlineHTML(count,theTitle,theLink,companyDiv,companyName,storyCat);	
				}				
				dict.push(theTitle);
				count++;
			}
		});

	});
}

function buildStoryHTML(numkey, storyTitle, storyDate, storySource, storyLink, storySummary, companyDiv, companyName, storyCat){
	$(companyDiv).find(".spinner").remove();
	$(companyDiv).append('<div id="'+companyName+'-'+storyCat+'-story'+numkey+'" class="news-story full-story"><div class="story-block"><h4 class="story-date"></h4><h2></h2><p></p></div></div>');
	var storyDiv = $("#"+companyName+"-"+storyCat+"-story"+numkey);
	storyDiv.find("h4").html(storyDate);
	storyDiv.find("h2").html(storyTitle);
	storyDiv.find("p").html(storySummary);
	//$("#news-story"+numkey+" p").html(storySummary);
}

function buildHeadlineHTML(numkey, storyTitle, storyLink, companyDiv, companyName, storyCat) {
	$(companyDiv).append('<div id="'+companyName+'-'+storyCat+'-story'+numkey+'" class="summary"><div class="story-block"><p></p></div></div>');
	
	var storyDiv = $("#"+companyName+"-"+storyCat+"-story"+numkey);
	var storyAndLink = '<a href="'+storyLink+'">'+storyTitle+'</a>';
	storyDiv.find("p").html(storyAndLink);
}