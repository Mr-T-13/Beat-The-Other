package com.example.demo;

public class User {

	private String nombre;
	private String password;
	private boolean isOnline;

	public User() {
	}

	public User(String nombre, String password) {
		this.nombre = nombre;
		this.password= password;

	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getPassword() {
		return password;
	}
	
	public void setOnline(boolean O) {
		this.isOnline = O;
	}
	
	public boolean getOnline() {
		return isOnline;
	}

}