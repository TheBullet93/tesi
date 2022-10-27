<html>
<head>
    <title>WebApp</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <link href="style.css" rel="stylesheet">
</head>
 
<h1>WebApp Home</h1>
  <body> 
      <form>
    	<input id="input" type="text">
    	<input onclick="sendMsg();" value="Visualizza testo" type="button">
    	<input  onclick="showZip();" value="Visualizza zip" type="button">
    	<input  onclick="removeZip();" value="Rimuovi zip" type="button">
   		
	</form>
	

  <div id="msg-box" style="width:300px; height: 200px; background: #eee; overflow:auto;"></div>
             
  </body>
  
   <script>
    var webSocket = new WebSocket("ws://localhost:8080/home");
    var msgInput = document.getElementById("input");
    var divMsg = document.getElementById("msg-box");

    //Test per visualizzare un testo dato in input
    function sendMsg() {
        var msgToSend = msgInput.value;
        webSocket.send(msgToSend);
        divMsg.innerHTML += "<div style='color:red'> " + msgToSend +
                            "</div>"
        msgInput.value = "";
    }
    
    
    //metodo da implementare. Test per visualizzare un immagine
    function showZip() {
    	  var img = new Image();
    	  img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/680px-Banana-Single.jpg";
    	  webSocket.send(img);
    	  document.body.appendChild(img);
    }
    
  //metodo da implementare. 
    function removeZip() {
   	
    }
   

    webSocket.onopen = function() {
        console.log("connection opened");
    };

    webSocket.onclose = function() {
        console.log("connection closed");
    };

    webSocket.onerror = function wserror(message) {
        console.log("error: " + message);
    }
  </script>
 
</html>
