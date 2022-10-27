package websocket;

import java.util.HashSet;
import java.util.Set;
import javax.websocket.Session;
import zip.FileZip;

public class ZipSessionHandler {
	
		private final Set<Session> sessions = new HashSet<>();
	    private final Set<FileZip> zipFiles = new HashSet<>();
	    
	    //metodo che aggiunge sessioni al server
	    public void addSession(Session session) {
	        sessions.add(session);
	    }

	    //Metodo per rimuovere sessioni dal server
	    public void removeSession(Session session) {
	        sessions.remove(session);
	    }
	    
	    //Metodo che restituisce la lista degli zip
	    public List<FileZip> getZip() {
	        return new ArrayList<>(zipFiles);
	    }

	    //Metodo che carica uno zip
	    public void loadZip(FileZip zip) {
	    	//da implementare
	    }

	    //Metodo che rimuove uno zip
	    public void removeZip(FileZip zip) {
	    	//da implementare
	    }

	  
}
