package com.example.demo;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST})
public class UserController {
	
	private UserService userService= new UserService();
	
	
	//COGE TODOS LOS USUARIOS
	@RequestMapping(value="/users" , method=RequestMethod.GET)
	public List<User> getUsers() {
		return userService.getUsers();
	}
	
	//COGE UN SOLO USUARIO QUE SE PIDA POR EL NOMBRE Y LA CONTRASEÑA. SI ESTÁ LO DEVUELVE SI NO ESTÁ DEVUELVE NULL
	@RequestMapping(value= "/user/{userName}/{userPassword}", method=RequestMethod.GET)
	public User getUser(@PathVariable ("userName") String name, @PathVariable ("userPassword") String password) { 
		return userService.getUser(name,password);
	}
	
	//METE UN USUARIO PARA ELLO DEBEMOS PASARLE SU NOMBRE, NICK Y CONTRASEÑA. //DEVUELVE TRUE SI LO HACE
	@RequestMapping(value= "/user/{userName}/{userNick}/{userPassword}", method=RequestMethod.POST)
	public ResponseEntity<Boolean> addUser(@PathVariable ("userName") String name, @PathVariable ("userNick") String nickname, @PathVariable ("userPassword") String password) { 
		userService.addUser(name, nickname, password);
		return new ResponseEntity<Boolean>(true,HttpStatus.CREATED); //devuelve un codigo http si ha tenido exito
	}
	
	//DEVUELVE LOS USUARIOS ONLINE
	@RequestMapping(value="/onlineUsers" , method=RequestMethod.GET)
	public List<String> getOnlineUsers() {
		return userService.getOnlineUsers();
	}
	
	//DESCONECTA A UN USUARIO
	@RequestMapping(value="/disconnect" , method=RequestMethod.POST)
	public ResponseEntity<Boolean> disconnect(@RequestBody String username){
		return new ResponseEntity<Boolean> (userService.disconnect(username), HttpStatus.OK);
	}
}
