package com.namdp.glitch_novels.resources_server.services;

import com.namdp.glitch_novels.resources_server.dto.GenreDTO;
import com.namdp.glitch_novels.resources_server.entities.Genre;
import com.namdp.glitch_novels.resources_server.repositories.GenreRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GenreService {
	private final GenreRepository genreRepository;

	public GenreService(GenreRepository genreRepository) {
		this.genreRepository = genreRepository;
	}

	/**
	 * Find all genres in the database, excluding the novels associated with it. Use for lighter response object.
	 *
	 * @return List of genres in the database, excluding the novels associated with it.
	 */
	@Transactional
	public List<GenreDTO> findAll() {
		List<Genre> dbGenres = genreRepository.findAll();
		List<GenreDTO> apiGenres = new ArrayList<>();

		for (Genre dbGenre : dbGenres) {
			GenreDTO apiGenre = GenreDTO.mapEntity(dbGenre, true);
			apiGenres.add(apiGenre);
		}

		return apiGenres;
	}
}
