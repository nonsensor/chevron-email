/*

function p(t){
    t = t.trim();
    return (t.length>0?'<p>'+t.replace(/[\r\n]+/,'</p><p>')+'</p>':null);
}

function writeStories(elNum,catContainer,xmlNode) {
	var storyNum = elNum.split("-").pop();
	var sSource = xmlNode.find('SourceDescription').text();
	var sLink = xmlNode.find('WebPageURL').text();
	var sTitle = xmlNode.find('TitleText').text();
	var sDate = xmlNode.find("PublishedDateTimestamp").text();
	var sMoreLink = ' ... <a href="'+sLink+'">More »</a>';
	var sContent = xmlNode.find('ContentText').text();
	sContent = sContent.substr(0,160);
	sDate = new Date(sDate);
	var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
	sDate = monthNames[sDate.getMonth()] + " " + sDate.getDay();
	var storyTitleText = '<a target="_blank" href="'+sLink+'">'+sTitle+'</a>';
	if(storyNum<3) {
		catContainer.append('<div class="news-story" id="story-'+elNum+'"><div class="story-block"><h2></h2><p class="meta"></p><div class="contents"></div></div></div>');
		$('#story-'+elNum+' h2').html(storyTitleText);
		$('#story-'+elNum+' .meta').html(sSource + " | " + sDate);
		$('#story-'+elNum+' .contents').html(sContent);
		$('#story-'+elNum+' .contents').append(sMoreLink);
	}
	else {
		catContainer.append('<div class="news-story" id="story-'+elNum+'"><div class="story-block"><h4></h4></div></div>');
		$('#story-'+elNum+' h4').html(storyTitleText);
		}$('#story-'+elNum+' h4').append("<small>&nbsp;&nbsp;"+sSource+"</small>");
}
*/

// TODO
// 1. grab the relevant information from each node.
// 2. change HTML for top 3 vs the rest of the stories
// 3. make sure the doneflag is working when you call other categories
// 4. try to abstract this out so there isn't a function for every category

function parseNews(xml) {
	execActivityStories = $(xml).find("NewsDetails").has('CategoryText:contains("Executive Activity")');
	execActivityStories.each(function(i){
		if ($(this).find("doneflag").length==0) {
			theTitle = $(this).find("TitleText").text();
			buildStoryHTML(i,theTitle,"TestDate","Blah blah this is the summary");
			$(this).append("<doneflag>Set</doneflag><br>");
		}
	});
}

function buildStoryHTML(numkey, storyTitle, storyDate, storySummary){
	$("#amazon-stories").append('<div id="news-story'+numkey+'" class="news-story"><div class="story-block"><h2></h2><p></p></div></div>');
	$("#news-story"+numkey+" h2").html(storyTitle);
	$("#news-story"+numkey+" p").html(storySummary);
}