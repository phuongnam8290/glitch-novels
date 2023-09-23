package com.namdp.glitch_novels.resources_server.repositories;

import com.namdp.glitch_novels.resources_server.entities.Novel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface NovelRepository extends JpaRepository<Novel, Integer> {
	List<Novel> deleteNovelByIdIn(Collection<Integer> ids);

	@Query("SELECT DISTINCT N " +
			"FROM Novel N LEFT JOIN N.genres G " +
			"WHERE N.title LIKE %:keyword% " +
			"OR G.title LIKE %:keyword% ")
	List<Novel> searchNovels(String keyword);
}