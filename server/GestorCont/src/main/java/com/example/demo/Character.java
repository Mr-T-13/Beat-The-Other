package com.example.demo;

public class Character {
	private int life;
	private int combo;
	
	Character(int life){
		this.life=life;
		combo=0;
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
	
}
