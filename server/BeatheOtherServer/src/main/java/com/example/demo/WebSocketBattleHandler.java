package com.example.demo;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class WebSocketBattleHandler extends TextWebSocketHandler{
	private ObjectMapper mapper = new ObjectMapper();
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		JsonNode node = mapper.readTree(message.getPayload());
		
		switch(node.get("Order").asText())
		{
			case "Attack":
				var dmg = node.get("dmg").asInt();
				var attacker = node.get("attacker").asInt();
				var battleNum = node.get("battleNum").asInt();
				BeatheOtherApplication.lobbyManager.GetBattle(battleNum).Attack(attacker, dmg);
				int enemyLife = BeatheOtherApplication.lobbyManager.GetBattle(battleNum).GetEnemy(attacker).getLife();
				session.sendMessage(new TextMessage(String.valueOf(enemyLife)));
				break;		
		}
		
		
	}

}
