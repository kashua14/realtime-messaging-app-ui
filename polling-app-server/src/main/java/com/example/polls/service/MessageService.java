package com.example.polls.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.polls.model.Messages;
import com.example.polls.payload.PreviousChat;
import com.example.polls.repository.MessagesRepository;
import com.example.polls.repository.PollRepository;

@Service
public class MessageService {
	
	@Autowired
    private MessagesRepository messagesRepository;

	public ArrayList<Messages> getMessages(String reciever, String sender) {
		ArrayList<Messages> chatHistory = new ArrayList<>();
		 for(Messages m: messagesRepository.findAll()) {
			 if(m.getReciever().equals(reciever) && m.getSender().equals(sender)) {
				 chatHistory.add(m);
			 }
		 }
		 return chatHistory;
	}
}
