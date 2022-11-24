import java.awt.Desktop;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class FileZip {
	
private static final int BUFFER_SIZE = 4096;
	
	public String zipPath;
	
	//Costruttore
	public FileZip(String path){
		this.zipPath = path;
	}
	
	
	//Metodo che scompatta lo zip in una cartella
	public void unZip(String zipFilePath, String destDirectory)throws IOException{
		 File destDir = new File(destDirectory);
	        if (!destDir.exists()) {
	            destDir.mkdir();
	        }
	        ZipInputStream zipIn = new ZipInputStream(new FileInputStream(zipFilePath));
	        ZipEntry entry = zipIn.getNextEntry();
	        // itera sugli elementi del file zip
	        while (entry != null) {
	            String filePath = destDirectory + File.separator + entry.getName();
	            if (!entry.isDirectory()) {
	                // se l'elemento è un file, lo estrae
	                extractFile(zipIn, filePath);	               
	            } else {
	                // se l'elemento è una directory, creare la directory
	                File dir = new File(filePath);
	                dir.mkdirs();
	            }
	            zipIn.closeEntry();
	            entry = zipIn.getNextEntry();
	        }
	        zipIn.close();
	        showWebPage(destDirectory);
	}
	
	
	//Metodo che visualizza il file html
	private void showWebPage(String URL) throws IOException{
		 File file = new File(URL);
	        File[] listOfFiles = file.listFiles();
	        for (int i = 0; i < listOfFiles.length; i++) {
	        	String html = "html";
	        	String extension = listOfFiles[i].getName().substring(listOfFiles[i].getName().lastIndexOf(".") + 1, listOfFiles[i].getName().length());
	          if (listOfFiles[i].isFile() && html.equals(extension)) {
	        	  Desktop.getDesktop().browse(listOfFiles[i].toURI());
	          } 
	        }
	}
	
	//Metodo che estrae i file da uno zip
	private void extractFile(ZipInputStream zipIn, String filePath)throws IOException{
		BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(filePath));
        byte[] bytesIn = new byte[BUFFER_SIZE];
        int read = 0;
        while ((read = zipIn.read(bytesIn)) != -1) {
            bos.write(bytesIn, 0, read);
        }
        bos.close();
	}
	
	    
	    
	
}
