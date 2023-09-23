package com.namdp.glitch_novels.resources_server.services;

import com.namdp.glitch_novels.resources_server.dto.ChapterDTO;
import com.namdp.glitch_novels.resources_server.entities.Chapter;
import com.namdp.glitch_novels.resources_server.repositories.ChapterRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ChapterService {
	private final ChapterRepository chapterRepository;

	public ChapterService(ChapterRepository chapterRepository) {
		this.chapterRepository = chapterRepository;
	}

	@Transactional
	public ChapterDTO findById(int id) {
		Chapter dbChapter = chapterRepository
				.findById(id)
				.orElseThrow(() -> new NullPointerException("No chapter founded!"));

		return ChapterDTO.mapEntity(dbChapter, false);
	}
}
