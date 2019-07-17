package com.example.polls.model;

import com.example.polls.model.audit.DateAudit;
//import org.hibernate.annotations.NaturalId;
import javax.persistence.*;
//import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
//import java.util.HashSet;
//import java.util.Set;

/**
 * Created by kashua14 on 14/07/19.
 */

@Entity
public class Messages extends DateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 40)
    private String sender;

    @NotBlank
    @Size(max = 40)
    private String reciever;

    @NotBlank
    @Size(max = 1000)
    private String content;

    
    
	public Messages() {
		super();
	}

	public Messages( String sender, String reciever, String content) {
		super();
		this.sender = sender;
		this.reciever = reciever;
		this.content = content;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

	public String getReciever() {
		return reciever;
	}

	public void setReciever(String reciever) {
		this.reciever = reciever;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

//	public User getUser() {
//		return user;
//	}
//
//	public void setUser(User user) {
//		this.user = user;
//	}

	
}