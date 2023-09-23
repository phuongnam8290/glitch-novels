package com.namdp.glitch_novels.resources_server.services;

import com.namdp.glitch_novels.resources_server.dto.TagDTO;
import com.namdp.glitch_novels.resources_server.entities.Tag;
import com.namdp.glitch_novels.resources_server.repositories.TagRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

// TODO: Can tags and genres service / repository be grouped as one?
@Service
public class TagService {
	private final TagRepository tagRepository;

	public TagService(TagRepository tagRepository) {
		this.tagRepository = tagRepository;
	}

	/**
	 * Find all tags in the database, excluding the novels associated with it. Use for lighter response object.
	 *
	 * @return List of tags in the database, excluding the novels associated with it.
	 */
	@Transactional
	public List<TagDTO> findAll() {
		List<Tag> dbTags = tagRepository.findAll();
		List<TagDTO> apiTags = new ArrayList<>();

		for (Tag dbTag : dbTags) {
			TagDTO apiTag = TagDTO.mapEntity(dbTag, true);
			apiTags.add(apiTag);
		}

		return apiTags;
	}
}
