package com.example.demo;

public class User {

	private String nombre;
	private String password;
	private String nickname;
	private int id;
	private float timestamp;
	private boolean isOnline;

	public User() {
	}

	public User(String nombre, String nickname, String password) {
		this.nombre = nombre;
		this.nickname = nickname;
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
	
	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public float getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(float timestamp) {
		this.timestamp = timestamp;
	}

	public void setOnline(boolean O) {
		this.isOnline = O;
	}
	
	public boolean getOnline() {
		return isOnline;
	}
}