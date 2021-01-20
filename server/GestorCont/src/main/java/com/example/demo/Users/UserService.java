package com.example.demo.Users;

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
import java.util.Set;

import org.apache.tomcat.util.json.JSONParser;
import org.apache.tomcat.util.json.ParseException;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

@Component
public class UserService {
	private Map<String, User> userMap= new HashMap<String,User>();
	File userlist = new File("userlist.txt");
	
	UserService(){
		
		try {
			
			if(!userlist.exists()) {
				userlist.createNewFile();
			}else {
				readUserlist(); 
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
		if(userMap.get(username).getOnline()) {
			userMap.get(username).setOnline(false);
			result = true;
		}
		System.out.println(result);
		return result;
	}
	
	private void readUserlist() {
		try {
			FileReader ler = new FileReader(userlist);
			BufferedReader reader = new BufferedReader(ler);
			JSONParser jsonParser = new JSONParser(reader);
			HashMap<String,Object> map = (HashMap<String,Object>) jsonParser.parse();
			Object[] keys =  map.keySet().toArray();
			for(int i = 0; i < keys.length; i++) {
				String clave = keys[i].toString();
				String info = map.get(clave).toString();
				info = info.replace("=", ":");
				JSONObject json = new JSONObject(info);
				User usuario = new User(json.get("nombre").toString(), json.get("nickname").toString(), json.get("password").toString());
				userMap.put(clave, usuario);
			}
		}catch(IOException | ParseException e) {
			e.printStackTrace();
		}
	}
	
}