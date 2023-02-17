package com.namdp.glitch_novels.resources_server.repositories;

import com.namdp.glitch_novels.resources_server.entities.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChapterRepository extends JpaRepository<Chapter, Integer> {
}
