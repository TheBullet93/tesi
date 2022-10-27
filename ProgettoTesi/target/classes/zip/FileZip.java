
public class FileZip {
	
	private String zipPath;
	
	public FileZip() {}
	
	public String getFileZip(){
		return zipPath;
	}
	
	public void setFileZip(String zipPath){
		this.zipPath = zipPath;
	}
	
	
	public void scanFileZip() {
	    try {
	      ZipInputStream zin = new ZipInputStream(
	          new FileInputStream(zipPath));
	      ZipEntry entry;
	      while ((entry = zin.getNextEntry()) != null) {
	        zin.closeEntry();
	      }
	      zin.close();
	    } catch (IOException e) {
	    }
	  }
	
	
	public void loadFileZip(String fileName) {
	    try {
	      ZipInputStream zin = new ZipInputStream(
	          new FileInputStream(zipPath));
	      ZipEntry entry;
	      while ((entry = zin.getNextEntry()) != null) {
	        if (entry.getName().equals(fileName)) {
	          BufferedReader in = new BufferedReader(
	              new InputStreamReader(zin));
	        zin.closeEntry();
	      }
	      zin.close();
	    } catch (IOException e) {
	    }
	  }
	
}
