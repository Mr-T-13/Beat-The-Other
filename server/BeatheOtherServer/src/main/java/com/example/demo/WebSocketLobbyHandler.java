package com.example.demo;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class WebSocketLobbyHandler extends TextWebSocketHandler{
	private ObjectMapper mapper = new ObjectMapper().enable(DeserializationFeature.FAIL_ON_TRAILING_TOKENS);
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		JsonNode node = mapper.readTree(message.getPayload());
		
		switch(node.get("Order").asText())
		{
			case "Join":
				var battleN = node.get("battleN").asInt();
				int player = BeatheOtherApplication.lobbyManager.JoinBattle(battleN, session);
				session.sendMessage(new TextMessage(String.valueOf(player)));
				System.out.println(player);
				break;
			case "Leave":
				var battleNum = node.get("battleN").asInt();
				var playerN = node.get("playerN").asInt();
				BeatheOtherApplication.lobbyManager.LeaveBattle(battleNum, playerN);
				if(BeatheOtherApplication.lobbyManager.GetBattle(battleNum).GetCharacter(1).getUserSession() == null && BeatheOtherApplication.lobbyManager.GetBattle(battleNum).GetCharacter(2).getUserSession() == null) {
					BeatheOtherApplication.lobbyManager.GetBattle(battleNum).ResetBattle();
				}
				break;
			case "List":
				JsonNode e = mapper.valueToTree(BeatheOtherApplication.lobbyManager.GetBattles());
				session.sendMessage(new TextMessage(e.asText()));
				break;
			case "Attack":
				var dmg = node.get("dmg").asInt();
				var attacker = node.get("attacker").asInt();
				var battleNum2 = node.get("battleNum").asInt();
				BeatheOtherApplication.lobbyManager.GetBattle(battleNum2).Attack(attacker, dmg);
				var enemyLife = String.valueOf(BeatheOtherApplication.lobbyManager.GetBattle(battleNum2).GetEnemy(attacker).getLife());
				var playerLife = String.valueOf(BeatheOtherApplication.lobbyManager.GetBattle(battleNum2).GetCharacter(attacker).getLife());
				var enemyCombo = String.valueOf(BeatheOtherApplication.lobbyManager.GetBattle(battleNum2).GetEnemy(attacker).getCombo());
				var playerCombo = String.valueOf(BeatheOtherApplication.lobbyManager.GetBattle(battleNum2).GetCharacter(attacker).getCombo());
				session.sendMessage(new TextMessage("{\"enemyLife\" : \"" + enemyLife +"\","
												  + " \"playerLife\" : \"" + playerLife + "\","
												  + " \"enemyCombo\" : \"" + enemyCombo + "\","
												  + " \"playerCombo\" : \"" + playerCombo + "\"}"));
				BeatheOtherApplication.lobbyManager.GetBattle(battleNum2).GetEnemy(attacker).getUserSession().sendMessage(new TextMessage("{\"enemyLife\" : \"" + playerLife +"\","
																																		  + " \"playerLife\" : \"" + enemyLife + "\","
																																		  + " \"enemyCombo\" : \"" + playerCombo + "\","
																																		  + " \"playerCombo\" : \"" + enemyCombo + "\"}"));
				break;		
		}
		
		
	}

}
