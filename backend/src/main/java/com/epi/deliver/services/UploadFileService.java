package com.epi.deliver.services;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;

import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.epi.deliver.dto.ClienteDTO;
import com.epi.deliver.entities.TabCliente;
import com.epi.deliver.entities.TabEpi;
import com.epi.deliver.mappers.EpiMapper;
import com.epi.deliver.repositories.ClienteRepository;
import com.epi.deliver.repositories.EpiRepository;

@Service
public class UploadFileService {

	@Value("${diretorio.carga}")
	private String diretorioCarga;

	@Value("${comando.curl.upload}")
	private String comandoCurl;

	@Value("${comand.curl.token}")
	private String chaveSimpleFileUpload;

	public String uploadFile(String path) throws Exception {

		// String command = "curl https://app.simplefileupload.com/api/v1/file -F
		// file=@/Users/eduardoluciosilva/Documents/workspaces/projetoEpi/epis.txt -u
		// pc944e397c5595ad42082681dfe4736d6:s136e22ef336349d4cda1770f9ee43939";

		String command = comandoCurl + diretorioCarga + path + " " + chaveSimpleFileUpload;

		System.out.println(command);

		String urlResponse = "";
		
//		Process process2 = Runtime.getRuntime().exec(command);
//
//        try
//        {
//            int result = process2.waitFor();
//            if(result != 0)
//            {
//                throw new IOException("Fail to execute cammand. Exit Value[" + result + "], cmd => " + command);
//            }
//        }
//        catch(InterruptedException e)
//        {
//            process2.destroyForcibly();
//
//            throw new IOException(e);
//        }
//
//        BufferedInputStream in = null;
//
//        try
//        {
//            ByteArrayOutputStream out = new ByteArrayOutputStream();
//            in = new BufferedInputStream(process2.getInputStream());
//            byte[] buf = new byte[1024];
//            int read = 0;
//
//            while((read = in.read(buf)) != -1)
//            {
//                out.write(buf, 0, read);
//                out.flush();
//
////                if(_maxResLength > 0 && out.size() > _maxResLength)
////                {
////                    throw new IOException("Response length exceeded.");
////                }
//            }
//            BufferedReader response = new BufferedReader(new InputStreamReader(process2.getInputStream()));
//            StringBuilder result = new StringBuilder();
//            String s;
//            while((s = response.readLine()) != null) {
//                result.append(s);
//            }
//            System.out.println(result.toString());
//
//            //You then need to close the BufferedReader if not using Java 8
//            response.close();
//        }
//        finally
//        {
//            if(in != null)
//            {
//                in.close();
//            }
//        }
//    
		
		
		try {

			
			
			
		    System.out.println(" ### comecar o process1 ####");
		    Process process = Runtime.getRuntime().exec(command);
			//System.out.println("##### process ###" + process.getInputStream());

			InputStream inputStream = process.getInputStream();
			BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
			List<String> list = new ArrayList<>();

			System.out.println("###### output: ");
			Thread.sleep(2000);

			//while (process.isAlive())
				//System.out.println("#### chegou no wile: ");
				//Thread.sleep(2000);
				//process.waitFor();
				
			int result = process.waitFor();
			System.out.println("##### pos o output: ");
            if(result != 0)
	            {
	                throw new IOException("Fail to execute cammand. Exit Value[" + result + "], cmd => " + command);
	            }
			System.out.println("return value: " + process.exitValue());
			list = reader.lines().collect(Collectors.toList());

			StringBuilder sb = new StringBuilder();

			for (String ch : list) {
				sb.append(ch);
			}

			String stringResponse = sb.toString();

			System.out.println("String - " + stringResponse);

			reader.lines().forEach(System.out::println);

			try {
				JSONObject jsonObject2 = new JSONObject(stringResponse);
				jsonObject2.getJSONObject("data").getJSONObject("attributes");

				urlResponse = jsonObject2.getJSONObject("data").getJSONObject("attributes").getString("cdn-url")
						.toString();

				System.out.println("### urlResponse: " + urlResponse);
			} catch (JSONException err) {
				System.out.println("### Error: " + err.toString());
			}

			reader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
			reader.lines().forEach(System.err::println);
			System.out.println("---");

		} catch (IOException e) {
			System.out.println("### deu erro ao fazer upload ###: " + e.getMessage());
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new Exception("Falha no mapper Funcionarios: " + e.getCause());
		}

		return urlResponse;

	}

	public void deleteUploadFile(String path) throws Exception {
		
		String command = "curl -X DELETE https://app.simplefileupload.com/api/v1/files?url=";
		
		try {

			Process process = Runtime.getRuntime().exec(command+path);
		
		}catch (IOException e) {
			System.out.println("### deu erro ao deletar arquivo ###: " + e.getMessage());
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new Exception("Falha no mapper Funcionarios: " + e.getCause());
		}
	}
}
