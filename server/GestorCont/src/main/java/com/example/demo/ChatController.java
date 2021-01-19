package com.example.demo;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST})
public class ChatController {
	
	private Chat chat= new Chat();
	
	
	//DEVUELVE LAS ÚLTIMAS X LÍNEAS DEL CHAT
	@RequestMapping(value="/UpdateChat" , method=RequestMethod.GET)
	public List<String> Update() {
		return chat.Update();
	}
	
	//AÑADE UNA LINEA NUEVA AL CHAT
	@RequestMapping(value="/AddMsg" , method=RequestMethod.POST)
	public ResponseEntity<Boolean> AddMsg(@RequestBody String userNick,@RequestBody String msg){
		return new ResponseEntity<Boolean> (chat.AddMsg(userNick+": "+ msg), HttpStatus.OK);
	}
}