package com.namdp.glitch_novels.resources_server.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.namdp.glitch_novels.resources_server.dto.ChapterDTO;
import com.namdp.glitch_novels.resources_server.services.ChapterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChapterController {
	private final ObjectMapper mapper;
	private final ChapterService chapterService;

	public ChapterController(ObjectMapper mapper, ChapterService chapterService) {
		this.mapper = mapper;
		this.chapterService = chapterService;
	}

	@GetMapping("/chapter/{id}")
	public ResponseEntity<ObjectNode> findById(@PathVariable("id") int id) {
		ObjectNode responseBody = mapper.createObjectNode();
		ChapterDTO chapter;

		// Catch the NullPointerException being thrown from service and return an appropriate response.
		try {
			chapter = chapterService.findById(id);
		} catch (NullPointerException ex) {
			responseBody.put("message", "Cannot find the chapter with the given id");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
		}

		responseBody = mapper.valueToTree(chapter);
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}
}
