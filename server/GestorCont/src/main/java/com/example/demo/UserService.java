package com.example.demo;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.tomcat.util.json.JSONParser;
import org.apache.tomcat.util.json.ParseException;
import org.json.JSONArray;
import org.json.JSONObject;

public class UserService {
	private Map<String, User> userMap= new HashMap<String,User>();
	File userlist = new File("userlist.txt");
	
	UserService(){
		//User a= new User("David","123");
		//User b= new User("Adrian","123");
		//User c= new User("Jesus", "123");
		//userMap.put(a.getNombre(), a);
		//userMap.put(b.getNombre(), b);
		//userMap.put(c.getNombre(), c);
		
		try {
			if(!userlist.exists()) {
				userlist.createNewFile();
			}else {
				//FALLO: Intento de lectura del txt para guardarlos en el userMap
				
				FileReader ler = new FileReader(userlist);
				BufferedReader reader = new BufferedReader(ler);
				//JSONParser jsonParser = new JSONParser();
				//JSONArray userlist_json = (JSONArray) jsonParser.parse();
				//System.out.println(userlist_json);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public List<User> getUsers() {
		return new 	ArrayList<User>(userMap.values());
	};
	
	public List<String> getOnlineUsers() {
		ArrayList<String> connected = new ArrayList<String>();
		
		ArrayList<User> all = new ArrayList<User>(userMap.values());
		for(int i=0; i< all.size(); i++)
		{
			if(all.get(i).getOnline())
			{
				connected.add((all.get(i).getNombre()));
			}
		}
		return connected;
	};
	
	public User getUser(String name, String password) {
		User a= new User();
		if(userMap.get(name).getPassword().equals(password)) {
			a=userMap.get(name);
			a.setOnline(true);
		}
		return a;
	}

	public void addUser(String name, String nickname, String password) {
		try {
			User u = new User(name, nickname, password);
			userMap.put(u.getNombre(), u);
			FileWriter fw = new FileWriter(userlist.getAbsoluteFile());
			BufferedWriter bw = new BufferedWriter(fw);
			JSONObject userMap_Json = new JSONObject(userMap);
			bw.write(userMap_Json.toString());
			bw.close();	
		} catch (IOException e) {
			e.printStackTrace();
		}
	};
	
	public boolean disconnect (String username) {
		boolean result = false;
		
		ArrayList<User> all = new ArrayList<User>(userMap.values());
		for(int i=0; i< all.size(); i++)
		{
			if(all.get(i).getNombre() == username)
			{
				all.get(i).setOnline(false);
				result = true;
			}
		}
		
		return result;
	}
	
}