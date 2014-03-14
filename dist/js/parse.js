function p(t){
    t = t.trim();
    return (t.length>0?'<p>'+t.replace(/[\r\n]+/,'</p><p>')+'</p>':null);
}

function writeStories(elNum,catContainer,xmlNode) {
	catContainer.append('<div class="news-story" id="story-'+elNum+'"><div class="story-block"><h2></h2><p class="meta"></p><div class="contents"></div></div></div>');
	var sSource = xmlNode.find('SourceDescription').text();
	var sLink = xmlNode.find('WebPageURL').text();
	var sTitle = xmlNode.find('TitleText').text();
	var sDate = xmlNode.find("PublishedDateTimestamp").text();
	var sMoreLink = ' ... <a href="'+sLink+'">[More]</a>';
	var sContent = xmlNode.find('ContentText').text();
	sContent = sContent.substr(0,160);
	sDate = new Date(sDate);
	var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
	sDate = monthNames[sDate.getMonth()] + " " + sDate.getDay();
	var storyTitleText = '<a href="'+sLink+'">'+sTitle+'</a>';
	$('#story-'+elNum+' h2').html(storyTitleText);
	$('#story-'+elNum+' .meta').html(sSource + " | " + sDate);
	$('#story-'+elNum+' .contents').html(sContent);
	$('#story-'+elNum+' .contents').append(sMoreLink);

}
