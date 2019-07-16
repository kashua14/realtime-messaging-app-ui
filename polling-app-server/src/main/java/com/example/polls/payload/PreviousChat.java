package com.example.polls.payload;

public class PreviousChat {
	private Long id;
	private String sender;
    private String reciever;
    private String content;
    
	public PreviousChat() {
		super();
	}

	public PreviousChat(Long id, String reciever, String sender, String content) {
		super();
		this.id = id;
		this.reciever = reciever;
		this.sender = sender;
		this.content = content;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}
    
    
}
