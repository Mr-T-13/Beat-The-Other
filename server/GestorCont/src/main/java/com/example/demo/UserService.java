package com.example.demo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UserService {
	private Map<String, User> userMap= new HashMap<String,User>();
	
	UserService(){
		User a= new User("David","123");
		User b= new User("Adrian","123");
		User c= new User("Jesus", "123");
		userMap.put(a.getNombre(), a);
		userMap.put(b.getNombre(), b);
		userMap.put(c.getNombre(), c);
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

	public void addUser(User user) {
		userMap.put(user.getNombre(), user);	
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