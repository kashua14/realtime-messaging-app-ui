package com.example.polls.repository;

import com.example.polls.model.Messages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Created by rajeevkumarsingh on 02/08/17.
 */
@Repository
public interface MessagesRepository extends JpaRepository<Messages, Long> {

	 Optional<Messages> findBySender(String sender);
	 
    List<Messages> findByIdIn(List<Long> userIds);

    Optional<Messages> findByReciever(String reciever);
    
    Boolean existsBySender(String sender);

    Boolean existsByReciever(String reciever);
}