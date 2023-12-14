package com.epi.deliver.services;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.Bucket;
import com.amazonaws.services.s3.model.ObjectListing;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3ObjectSummary;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.transfer.MultipleFileUpload;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.TransferManagerBuilder;
import com.amazonaws.services.s3.transfer.Upload;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;

@Service
public class AwsService {

	@Autowired
	private AmazonS3 amazonS3;

	@Value("${diretorio.carga}")
	private String diretorio;

	public List<Bucket> listBuckets() {
		return amazonS3.listBuckets();
	}

	public List<S3ObjectSummary> listObjects(String bucketName) {
		ObjectListing objectListing = amazonS3.listObjects(bucketName);
		return objectListing.getObjectSummaries();
	}

	public String uploadFile( String nomeArq) {

		String bucketName = "sistemaepi"; //*** Bucket name ***";
		String stringObjKeyName = ""; // *** String object key name ***";
		String fileObjKeyName = nomeArq; //"*** File object key name ***";
		String fileName = diretorio;  //"*** Path to file to upload ***";
		
		String retorno = "";

		try {
			System.out.println("###### comecou o upload ##### ");
			
			System.out.println("###### diretorio: " + fileName);
			System.out.println("###### fileObjKeyName: " + fileObjKeyName);

			// s3://sistemaepi/arquivos/

			//amazonS3.putObject("sistemaepi", "colab.txt", "Uploaded String Object");

			// Upload a file as a new object with ContentType and title specified.
			PutObjectRequest request = new PutObjectRequest(bucketName, fileObjKeyName, new File(fileName+fileObjKeyName));
			ObjectMetadata metadata = new ObjectMetadata();
			metadata.setContentType("plain/text");
			metadata.addUserMetadata("title", "arquivoTeste");
			request.setMetadata(metadata);
			amazonS3.putObject(request);
			System.out.println("###### upload feito ######");
			retorno = "###### upload feito ######";
			
			
		} catch (AmazonServiceException e) {
			// The call was transmitted successfully, but Amazon S3 couldn't process
			// it, so it returned an error response.
			
			System.out.println("### deu erro AmazonServiceException: " + e.getMessage());
			retorno = "### deu erro AmazonServiceException: " + e.getMessage();
			e.printStackTrace();
		} catch (SdkClientException e) {
			// Amazon S3 couldn't be contacted for a response, or the client
			// couldn't parse the response from Amazon S3.
			System.out.println("### deu erro SdkClientException: " + e.getMessage());
			retorno = "### deu erro SdkClientException: " + e.getMessage();
			e.printStackTrace();
		}

		System.out.println("###### finalizou metodo upload #####");
		
		return retorno;
	}
	
	
	public String uploadFile2() {
		
		File f = new File(diretorio);
		TransferManager xfer_mgr = TransferManagerBuilder.standard().build();
		try {
		    Upload xfer = xfer_mgr.upload("sistemaepi", "colab.txt", f);
		    // loop with Transfer.isDone()
		   // XferMgrProgress.showTransferProgress(xfer);
		    //  or block with Transfer.waitForCompletion()
		   // XferMgrProgress.waitForCompletion(xfer);
		} catch (AmazonServiceException e) {
		    System.err.println(e.getErrorMessage());
		    System.exit(1);
		}
		xfer_mgr.shutdownNow();
		
		
		return "";
	}
	
	
}
