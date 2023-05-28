package com.namdp.glitch_novels.resources_server.repositories;

import com.namdp.glitch_novels.resources_server.entities.Novel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface NovelRepository extends JpaRepository<Novel, Integer> {
  List<Novel> deleteNovelByIdIn(Collection<Integer> ids);
}
