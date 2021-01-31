package com.example.demo;

import org.springframework.web.socket.WebSocketSession;

public class LobbyManager extends BeatheOtherApplication {
	
	private Battle [] battles = new Battle[5];
	
	LobbyManager() {
		
	}
	
	public Battle GetBattle(int n)
	{
		return battles[n];
	}
	public Battle [] GetBattles()
	{
		return battles;
	}
	
	//Recibe un nº de batalla (Sala) y la sesión de WS, devuelve el nº de jugador asignado y -1 si ha habido error
	public int JoinBattle(int n, WebSocketSession s)
	{
		int playerN = -1;
		if(n < battles.length)
		{
			playerN = battles[n].Join(s);
		}
		return playerN;
	}
	
	//Recibe un nº de sala y una sesión y sale de ella
	public void LeaveBattle(int sala, int player)
	{
		battles[sala].GetCharacter(player).ResetCharacter(60);
			
	}

}
