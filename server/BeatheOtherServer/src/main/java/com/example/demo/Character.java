package com.example.demo;

import org.springframework.web.socket.WebSocketSession;

public class Character {
	private int life;
	private int combo;
	private WebSocketSession session;
	
	Character(int life){
		this.life=life;
		combo=0;
		session = null;
	}

	public int getLife() {
		return life;
	}

	public void setLife(int life) {
		this.life = life;
	}

	public int getCombo() {
		return combo;
	}

	public void setCombo(int combo) {
		this.combo = combo;
	}
	
	public void setUserSession( WebSocketSession s)
	{
		this.session = s;
	}
	public WebSocketSession getUserSession()
	{
		return this.session;
	}
	public void ResetCharacter(int life)
	{
		this.life = life;
		this.combo =0;
		this.session = null;
	}
}
