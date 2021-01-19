package com.example.demo;
import java.util.List;

public class Chat {
	public static final int maxMessages = 10;
	
	private List<String> messages;
	public Chat() {
	}
	public boolean AddMsg(String msg)
	{
		messages.add(msg);
		
		return true;
	}
	public List<String> Update()
	{
		if(messages.size() > maxMessages)
			return messages.subList(-maxMessages, messages.size());
		else
			return messages;
	}
}
