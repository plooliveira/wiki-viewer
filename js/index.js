var randomAnim 

$(document).ready(function(){
  
  formInitialize()
  
  randomInitialize()
  
})

function formInitialize(){
  $('#search').on('click', function(e){
    e.preventDefault()     
    requestWiki()
  })    
  
  $('#form-input').on('keypress', function (e) {
    
    if(e.which === 13){
      e.preventDefault()
      requestWiki()
      $("#input").blur()
    }
   });
}

function randomInitialize() {
  callRandomAnim()
  $("#random-wiki-id").mouseover(function(){
    killAnim()
  })
  
  $("#random-wiki-id").mouseout(function(){
    callRandomAnim()
  })
}

function callRandomAnim() {
    randomAnim = setInterval(function(){
     $("#random-wiki-id").effect("bounce", { times:3 },  { duration:400});
  }, 6000);
  }

function killAnim() {
  clearInterval(randomAnim)
}

function requestWiki(){
    $('#results').empty()
    let title = $('#input')[0].value
    var url = build_wiki_search_url(title);
        $.ajax( {
            type: "GET",
            url: url,
            dataType: 'jsonp',
            success: function(data) {
                let response = data.query.pages;
                $.each( response, function( index, value ){
                   let page = 'https://pt.wikipedia.org/?curid=' + value.pageid;
                   $('#results').append('<div class="article">' + '<a target="_blank" href="' +                          page +'">'+'<h4>'+value.title+'</h4>' + '<p>'+ value.extract +'</p>' + '</a>' + '</div>')  
                  
    //console.log(value)
});
              
            },
            error: function(errorMessage) {
                 //console.log("damnn");
              }
        });

}
  
function build_wiki_search_url(pattern) {
    var base = 'https://pt.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch='
    var calb = '&callback=JSON_CALLBACK'
    var page = 'https://en.wikipedia.org/?curid='
    var url = base + pattern 
+ calb
    return url
}