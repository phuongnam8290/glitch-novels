package com.namdp.glitch_novels.resources_server.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.namdp.glitch_novels.resources_server.dto.*;
import com.namdp.glitch_novels.resources_server.services.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SearchController {
	private final ObjectMapper mapper;
	private final NovelService novelService;
	private final AuthorService authorService;
	private final GenreService genreService;
	private final TagService tagService;
	private final PublicationStatusService publicationStatusService;

	public SearchController(ObjectMapper mapper, NovelService novelService, AuthorService authorService,
													GenreService genreService, TagService tagService, PublicationStatusService publicationStatusService) {
		this.mapper = mapper;

		this.novelService = novelService;
		this.authorService = authorService;
		this.genreService = genreService;
		this.tagService = tagService;
		this.publicationStatusService = publicationStatusService;
	}

	@GetMapping("/search")
	public ResponseEntity<ObjectNode> searchNovels(@RequestParam String keyword) {
		ObjectNode responseBody = mapper.createObjectNode();

		keyword = keyword.trim();
		if (keyword.isEmpty()) {
			responseBody.put("message", "Keyword cannot be empty.");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
		}

		List<NovelDTO> searchNovelResults = novelService.searchNovels(keyword);
		responseBody.set("novels", mapper.convertValue(searchNovelResults, JsonNode.class));

		List<AuthorDTO> searchAuthorResults = authorService.searchAuthor(keyword);
		responseBody.set("authors", mapper.convertValue(searchAuthorResults, JsonNode.class));

		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}

	@GetMapping("/advanced_search/filters")
	public ResponseEntity<JsonNode> getSearchFilters() {
		List<PublicationStatusDTO> publicationStatuses = publicationStatusService.findAll();
		List<GenreDTO> genres = genreService.findAll();
		List<TagDTO> tags = tagService.findAll();

		ObjectNode responseBody = mapper.createObjectNode();
		responseBody.set("publicationStatus", mapper.valueToTree(publicationStatuses));
		responseBody.set("genres", mapper.convertValue(genres, JsonNode.class));
		responseBody.set("tag", mapper.convertValue(tags, JsonNode.class));

		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}
}
