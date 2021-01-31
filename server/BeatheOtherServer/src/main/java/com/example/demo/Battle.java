package com.example.demo;

//La clase Battle es una sala, cuenta con 2 jugadores y las funciones necesarias para atacar
public class Battle {
	private int battleNum;
	private Character player1;
	private Character player2;
	
	final int vidaMax = 60;
	final int comboMax = 50;
	
	Battle()
	{
		player1 = new Character(vidaMax);
		player2 = new Character(comboMax);
		ResetBattle();
	}
	
	//Resetea una sala a los valores iniciales (la vacía).
	public void ResetBattle()
	{
		player1.setCombo(0);
		player1.setLife(vidaMax);
		player1.setUserID(-1);
		
		player2.setCombo(0);
		player2.setLife(vidaMax);
		player2.setUserID(-1);
	}
	
	public int Join(int userID)
	{
		//Si la sala está llena, devuelvo -1
		if( player1.getUserID() != -1 && player2.getUserID() != -1)
			return -1;
		if(player1.getUserID() != -1)
		{
			player1.setUserID(userID);
			return 1;
		}
		else if(player2.getUserID() != -1)
		{
			player2.setUserID(userID);
			return 2;
		}
		
		return 0;
	}
	
	//Recibiendo el nº de jugador atacante y el daño causado, resta a la vida del enemigo
	public int Attack(int attacker, int dmg)
	{
		if(attacker == 1)
		{
			player2.setLife(player2.getLife()-dmg);
			if(player2.getLife() <0) 
				player2.setLife(0);
			return player2.getLife();
		}
		else
		{
			player1.setLife(player1.getLife()-dmg);
			if(player1.getLife() <0) 
				player1.setLife(0);
			return player1.getLife();
		}
	}
	
}
