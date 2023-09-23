package com.namdp.glitch_novels.resources_server.repositories;

import com.namdp.glitch_novels.resources_server.entities.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<Tag, Integer> {
}
