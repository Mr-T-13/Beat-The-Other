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
	
	//METE UN USUARIO PARA ELLO DEBEMOS PASARLE SU NOMBRE Y CONTRASEÑA. //DEVUELVE TRUE SI LO HACE
	@RequestMapping(value= "/users", method=RequestMethod.POST)
	public ResponseEntity<Boolean> addUser(@RequestBody User user) { 
		userService.addUser(user);
		return new ResponseEntity<Boolean>(true,HttpStatus.CREATED); //devuelve un codigo http si ha tenido exito
	}
	
}
