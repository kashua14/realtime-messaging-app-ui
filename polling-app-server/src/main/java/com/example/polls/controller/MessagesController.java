package com.example.polls.controller;

import java.util.ArrayList;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.polls.model.Messages;
import com.example.polls.payload.PreviousChat;
import com.example.polls.payload.SentMessage;
import com.example.polls.payload.UserIdentityAvailability;
import com.example.polls.payload.UserSummary;
import com.example.polls.repository.MessagesRepository;
import com.example.polls.security.CurrentUser;
import com.example.polls.security.UserPrincipal;
import com.example.polls.service.MessageService;

@RestController
@RequestMapping("/api")
public class MessagesController {

	@Autowired
    private MessagesRepository messagesRepository;
	
	@Autowired
	private MessageService messageService;

    private static final Logger logger = LoggerFactory.getLogger(MessagesController.class);

    @GetMapping("/messages/me")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        UserSummary userSummary = new UserSummary(currentUser.getUsername());
        return userSummary;
    }
    
    // getting previous chats
    @GetMapping("/chathistory/{reciever}/{sender}")
    public ArrayList<Messages> getChatHistory(@PathVariable String reciever, @PathVariable String sender) {
		return messageService.getMessages(reciever, sender);
    }

    
    @GetMapping("/messages/checkRecieverAvailability")
    public UserIdentityAvailability checkRecieverAvailability(@RequestBody String reciever) {
        Boolean isAvailable = !messagesRepository.existsByReciever(reciever);
        return new UserIdentityAvailability(isAvailable);
    }
    
    // storing messages in a db
    @PostMapping("/chatroom")
    public void sendMessage(@RequestBody SentMessage sentMessage) {

        // Creating message in database
        Messages messages = new Messages(sentMessage.getSender(), sentMessage.getReciever(), 
        		sentMessage.getContent());

        messagesRepository.save(messages);

    }

}
