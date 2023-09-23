package com.namdp.glitch_novels.resources_server.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.namdp.glitch_novels.resources_server.dto.AuthorDTO;
import com.namdp.glitch_novels.resources_server.dto.GenreDTO;
import com.namdp.glitch_novels.resources_server.dto.NovelDTO;
import com.namdp.glitch_novels.resources_server.dto.TagDTO;
import com.namdp.glitch_novels.resources_server.services.AuthorService;
import com.namdp.glitch_novels.resources_server.services.GenreService;
import com.namdp.glitch_novels.resources_server.services.NovelService;
import com.namdp.glitch_novels.resources_server.services.TagService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class SearchController {
	private final ObjectMapper mapper;
	private final NovelService novelService;
	private final AuthorService authorService;
	private final GenreService genreService;
	private final TagService tagService;

	public SearchController(ObjectMapper mapper, NovelService novelService, AuthorService authorService,
													GenreService genreService, TagService tagService) {
		this.mapper = mapper;

		this.novelService = novelService;
		this.authorService = authorService;
		this.genreService = genreService;
		this.tagService = tagService;
	}

	@GetMapping("/search")
	public ResponseEntity<Map<String, Object>> searchNovels(@RequestParam String keyword) {
		Map<String, Object> responseBody = new HashMap<>();

		keyword = keyword.trim();
		if (keyword.isEmpty()) {
			responseBody.put("message", "Keyword cannot be empty.");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
		}

		List<NovelDTO> searchNovelResults = novelService.searchNovels(keyword);
		responseBody.put("novels", searchNovelResults);

		List<AuthorDTO> searchAuthorResults = authorService.searchAuthor(keyword);
		responseBody.put("authors", searchAuthorResults);

		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}

	@GetMapping("/advanced_search/filters")
	public ResponseEntity<JsonNode> getSearchFilters() {
		List<GenreDTO> genres = genreService.findAll();
		List<TagDTO> tags = tagService.findAll();

		ObjectNode responseBody = mapper.createObjectNode();
		responseBody.set("genres", mapper.convertValue(genres, JsonNode.class));
		responseBody.set("tag", mapper.convertValue(tags, JsonNode.class));

		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}
}
