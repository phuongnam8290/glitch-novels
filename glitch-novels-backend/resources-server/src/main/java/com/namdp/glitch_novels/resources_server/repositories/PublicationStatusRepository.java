package com.namdp.glitch_novels.resources_server.repositories;

import com.namdp.glitch_novels.resources_server.entities.PublicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PublicationStatusRepository extends JpaRepository<PublicationStatus, Integer> {
}
