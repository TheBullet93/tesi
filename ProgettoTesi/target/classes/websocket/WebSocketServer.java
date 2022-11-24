
import java.io.IOException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/index")
public class WebSocketServer{
	
	  // Metodo eseguito all'apertura della connessione
	    public void onOpen(Session session){
	        System.out.println(session.getId() + " ha aperto una connessione"); 
	        try {
	            session.getBasicRemote().sendText("Connessione Stabilita!");
	        } catch (IOException ex) {
	            ex.printStackTrace();
	        }
	        
	        new Thread(new ServerToBrowserMessageSender(session)).start();
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
	    	System.out.println("Error - " + t.getMessage());
		  }

	
	    /**
	     * Thread che scompatta lo zip e visualizza la pagina html
	     */
	    class ServerToBrowserMessageSender extends Thread {
	     
	    	private Session session;
		     
	    	public ServerToBrowserMessageSender(Session session) {
	    		this.session = session;
	    	}
	     
	    	@Override
	    	public void run() {
	     
	    		String zipFilePath = "/ProgettoTesi/src/main/zip example/GiocoFrutta.zip";
		        String destDirectory = "/ProgettoTesi/src/main/webapp";
		        FileZip unzipper = new FileZip(zipFilePath);
		        try {
		            unzipper.unZip(zipFilePath, destDirectory);
		            session.getBasicRemote().sendObject(unzipper);
		        } catch (Exception ex) {    
		            ex.printStackTrace();
		        }
	    		
	    	}
	    }    
}
