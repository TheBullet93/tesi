import org.apache.log4j.Logger;

import java.io.IOException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/home")
public class WebSocketServer {
	
	private ZipSessionHandler sessionHandler;
	
	  // Metodo eseguito all'apertura della connessione
	    public void onOpen(Session session){
	        System.out.println(session.getId() + " ha aperto una connessione"); 
	        try {
	            session.getBasicRemote().sendText("Connessione Stabilita!");
	        } catch (IOException ex) {
	            ex.printStackTrace();
	        }
	    }

	   
	    // Metodo eseguito alla ricezione di un messaggio
	    public void onMessage(String message, Session session){
	        System.out.println("Ricevuto messaggio da: " + session.getId() + ": " + message);
	        try {
	            session.getBasicRemote().sendText(message);
	        } catch (IOException ex) {
	            ex.printStackTrace();
	        }
	    }

	   
	    // Metodo eseguito alla chiusura della connessione
	    public void onClose(Session session){
	        System.out.println("Session " +session.getId()+" terminata");
	    }
	
	 
	    // Metodo eseguito in caso di errore
	    public void onError(Session session) {
			  Logger.getLogger(WebSocketServer.class.getName()).log(Level.SEVERE, null, error);
		  }

	
	 
	    
}
