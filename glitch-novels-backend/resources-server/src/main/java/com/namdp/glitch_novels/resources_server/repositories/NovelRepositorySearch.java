package com.namdp.glitch_novels.resources_server.repositories;

import com.namdp.glitch_novels.resources_server.entities.Novel;

import java.util.List;

public interface NovelRepositorySearch {
	List<Novel> searchNovelsWithCriteria(String title, String author, List<String> publicationStatusTitles,
																			 List<String> genreTitles, List<String> tagTitles);
}
