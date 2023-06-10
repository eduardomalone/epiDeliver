package com.epi.deliver.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DatasUtil {
	
	public Date dataAtualFormatada() throws ParseException {
		DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		Date date = new Date();
		System.out.println();
		Date dataFormatada = dateFormat.parse(dateFormat.format(date)); 
		return dataFormatada;
	}

}
