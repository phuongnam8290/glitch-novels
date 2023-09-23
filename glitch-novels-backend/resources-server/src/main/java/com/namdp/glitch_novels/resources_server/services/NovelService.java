package com.namdp.glitch_novels.resources_server.services;

import com.namdp.glitch_novels.resources_server.dto.NovelDTO;
import com.namdp.glitch_novels.resources_server.entities.Novel;
import com.namdp.glitch_novels.resources_server.repositories.NovelRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class NovelService {
	private final NovelRepository novelRepository;

	public NovelService(NovelRepository novelRepository) {
		this.novelRepository = novelRepository;
	}

	/**
	 * Find all novels in the database, excluding their content. Use for lighter response object.
	 *
	 * @return List of novels in the database, excluding their content.
	 */
	@Transactional
	public List<NovelDTO> findAll() {
		List<Novel> dbNovels = novelRepository.findAll();
		List<NovelDTO> apiNovels = new ArrayList<>();

		// Expunge novels' content.
		for (Novel dbNovel : dbNovels) {
			NovelDTO apiNovel = NovelDTO.mapEntity(dbNovel, true);
			apiNovels.add(apiNovel);
		}

		return apiNovels;
	}

	/**
	 * Find a specific novel in the database using its id, excluding its content. Use for lighter response object.
	 *
	 * @return A novel in the database, excluding its content.
	 */
	@Transactional
	public NovelDTO findById(int id) {
		Novel dbNovel = novelRepository
				.findById(id)
				.orElseThrow(() -> new NullPointerException("No novel found."));

		return NovelDTO.mapEntity(dbNovel, false);
	}

	/**
	 * Check if novels with IDs in the given list exist in the database.
	 *
	 * @param ids The list of novels' id
	 * @return {@code true} if all the novels with the given ids exist in the database, {@code false} otherwise.
	 */

	@Transactional
	public boolean checkIfAllNovelsExist(List<Integer> ids) {
		List<Novel> existedNovels = novelRepository.findAllById(ids);

		// If the number of novels found in the db not equal to the number of provided ids, then the list of ids contain
		// non-exist novels.
		return existedNovels.size() == ids.size();
	}

	/**
	 * Delete multiple novels in the database using their ids.
	 *
	 * @param ids List of ids of novels that will be deleted.
	 * @return List of deleted novels, excluding their content.
	 */
	@Transactional
	public List<NovelDTO> deleteNovelsByIds(List<Integer> ids) {
		List<Novel> dbNovels = novelRepository.deleteNovelByIdIn(ids);
		List<NovelDTO> apiNovels = new ArrayList<>();

		// Expunge novels' content.
		for (Novel dbNovel : dbNovels) {
			NovelDTO apiNovel = NovelDTO.mapEntity(dbNovel, true);
			apiNovels.add(apiNovel);
		}

		return apiNovels;
	}

	@Transactional
	public List<NovelDTO> searchNovels(String keyword) {
		List<Novel> dbNovels = novelRepository.searchNovels(keyword);
		List<NovelDTO> apiNovels = new ArrayList<>();

		// Expunge novels' content.
		for (Novel dbNovel : dbNovels) {
			NovelDTO apiNovel = NovelDTO.mapEntity(dbNovel, true);
			apiNovels.add(apiNovel);
		}

		return apiNovels;
	}
}
