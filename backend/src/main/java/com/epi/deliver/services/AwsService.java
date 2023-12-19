package com.epi.deliver.services;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.Bucket;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.ObjectListing;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectSummary;

@Service
public class AwsService {

	@Autowired
	private AmazonS3 amazonS3;


	@Value("${bucket.cliente}")
	private String bucketName;

	public List<Bucket> listBuckets() {
		return amazonS3.listBuckets();
	}

	public List<S3ObjectSummary> listObjects(String bucketName) {
		ObjectListing objectListing = amazonS3.listObjects(bucketName);
		return objectListing.getObjectSummaries();
	}

	public ArrayList<String> readFile(String fileName) throws Exception {

		ArrayList<String> listaLida = new ArrayList();

		try {
			boolean teste = amazonS3.doesObjectExist(bucketName, fileName);

			System.out.println("#### Arquivo encontrado no S3: " + String.valueOf(teste));

			S3Object object = amazonS3.getObject(new GetObjectRequest(bucketName, fileName));
			BufferedReader reader = new BufferedReader(new InputStreamReader(object.getObjectContent()));

			// Process the objectData stream.
			String s = null;
			while ((s = reader.readLine()) != null) {
				System.out.println("linha lida do S3: "+s);
				// your business logic here
				listaLida.add(s);
			}

			reader.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new Exception("### Exception - Problema ao ler o arquivo (readFile): " + e.getCause());
		} catch (AmazonServiceException e) {
			// The call was transmitted successfully, but Amazon S3 couldn't process
			// it, so it returned an error response.
			e.printStackTrace();
			throw new Exception(
					"### AmazonServiceException - Problema ao ler o arquivo (readFile): " + e.getCause());
		} catch (SdkClientException e) {
			// Amazon S3 couldn't be contacted for a response, or the client
			// couldn't parse the response from Amazon S3.
			e.printStackTrace();
			throw new Exception("### SdkClientException - Problema ao ler o arquivo (readFile): " + e.getCause());
		}

		return listaLida;
	}
	
	
	

	public void delefeFile(String fileName) throws Exception{
		try {

			amazonS3.deleteObject(new DeleteObjectRequest(bucketName, fileName));
		} catch (AmazonServiceException e) {
			// The call was transmitted successfully, but Amazon S3 couldn't process
			// it, so it returned an error response.
			e.printStackTrace();
			throw new Exception("### AmazonServiceException - Problema ao deletar o arquivo: " + e.getCause());
		} catch (SdkClientException e) {
			// Amazon S3 couldn't be contacted for a response, or the client
			// couldn't parse the response from Amazon S3.
			e.printStackTrace();
			throw new Exception("### SdkClientException - Problema ao deletar o arquivo: " + e.getCause());
		}
	}

}
