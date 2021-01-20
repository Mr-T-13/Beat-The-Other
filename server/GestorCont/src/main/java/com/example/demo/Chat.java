package com.example.demo;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class Chat {
	public static final int maxMessages = 10;
	
	private List<String> messages = new ArrayList<String>();
	public Chat() {
		messages.add(" ");
	}
	public boolean AddMsg(String msg)
	{
		messages.add(msg);
		for(int i = 0; i<messages.size(); i++) {
			System.out.println(messages.get(i));
		}
		
		return true;
	}
	public List<String> Update()
	{
			if(messages.size() > maxMessages) {
				//return messages.subList(-maxMessages, messages.size());
				List<String> msgToList = new ArrayList<String>();
				for(int i = messages.size() - maxMessages - 1; i< messages.size(); i++) 
				{
					msgToList.add(messages.get(i));
				}
				return msgToList;
			}else
				return messages;
		
	}
}
