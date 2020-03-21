function search() {
   console.log('Button Clicked');
   var searchStr = $('#txtSearch').val();
   console.log('Searching Movie: ' + searchStr);

   var stuff = { s: searchStr, apikey: 'b2dc44bb' };
   const urlBase = '/';

   $.get('http://www.omdbapi.com/', stuff, function(data, status) {
      console.log("Back from server with results: ");
      console.log(status);
      console.log(data);

      updateResults(data);
   });
}

function updateResults(data) {
   if (data.Search && data.Search.length > 0) {
      var resultList = $('#ulResults');
      resultList.empty();

      for (var i = 0; i < data.Search.length; i++) {
         var movie = data.Search[i].Title;
         resultList.append('<li><p>' + movie + '</p></li>');
      }
   }
}