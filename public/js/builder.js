(function() {

  function requestHandler(e) {
      if (e.target.readyState === 4) {
          document.querySelector( "div#output textarea" ).innerHTML = e.target.responseText;
      }
  }

  document.addEventListener( "DOMContentLoaded", function() {
    var checkboxes = document.querySelectorAll( "li > label > input:not([value='minify'])" ),
        minified = document.querySelector( "input[value='minify']" ),
        makeButton = document.querySelector( "button#get-url" ),
        downloadButton = document.querySelector( "button#download" ),
        output = document.querySelector( "input[type=text]" );

    var downloadEnabled = false,
        downloadSetting = "download=true",
        downloadLink = "";

    makeButton.onclick = function generateURL() {
      var link = location.protocol + "//" + location.host + "/build?",
          oneType,
          i;

      for( i = 0, l = checkboxes.length; i < l; i++ ) {
        if ( checkboxes[ i ].checked ) {
          link += checkboxes[ i ].value + "&";
        }
      }

      if ( minified.checked ) {
        link += minified.value;
        downloadLink = link + "&" + downloadSetting;
      } else {
        downloadLink = link + downloadSetting
        link = link.substring( 0, link.length - 1 );
      }

      output.value = link;
      downloadEnabled = true;

      var req = new XMLHttpRequest();
      req.onreadystatechange = requestHandler;
       req.open("GET", link, true);
      req.setRequestHeader("Accept", "*/*");
      req.send();

    };

    downloadButton.onclick = function downloadJS() {
      if ( downloadEnabled ) {
        window.open( downloadLink, 'download_window', 'toolbar=0,location=no,directories=0,status=0,scrollbars=0,resizeable=0,width=1,height=1,top=0,left=0' );
      }
    };
  });
}());
