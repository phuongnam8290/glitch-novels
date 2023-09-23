package com.namdp.glitch_novels.resources_server.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.namdp.glitch_novels.resources_server.dto.NovelDTO;
import com.namdp.glitch_novels.resources_server.services.NovelService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class NovelController {
	private final ObjectMapper mapper;
	private final NovelService novelService;

	public NovelController(ObjectMapper mapper, NovelService novelService) {
		this.mapper = mapper;
		this.novelService = novelService;
	}

	@GetMapping("/novels")
	public ResponseEntity<ObjectNode> findAllNovels() {
		ObjectNode responseBody = mapper.createObjectNode();

		// Get all novels in the db, then add them to object node for serialization.
		List<NovelDTO> novels = novelService.findAll();
		responseBody.set("novels", mapper.convertValue(novels, JsonNode.class));
		responseBody.put("total", novels.size());

		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}

	@DeleteMapping("/novels")
	public ResponseEntity<ObjectNode> deleteNovels(@RequestBody List<Integer> ids) {
		ObjectNode responseBody = mapper.createObjectNode();

		if (ids.isEmpty()) {
			responseBody.put("message", "The list of selected novels cannot be empty.");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
		}

		// Only delete if all the novels with the given ids exist in db.
		if (!novelService.checkIfAllNovelsExist(ids)) {
			responseBody.put("message", "Some or all of the selected novels could not be found.");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
		}

		List<NovelDTO> deletedNovels = novelService.deleteNovelsByIds(ids);
		responseBody.put("message", "The selected novels have been successfully deleted.");
		responseBody.set("deletedNovel", mapper.valueToTree(deletedNovels));
		return ResponseEntity.ok(responseBody);
	}

	@GetMapping("/novel/{id}")
	public ResponseEntity<ObjectNode> findNovelById(@PathVariable("id") int id) {
		ObjectNode responseBody = mapper.createObjectNode();
		NovelDTO novel;

		// Catch the NullPointerException being thrown from service and return an appropriate response.
		try {
			novel = novelService.findById(id);
		} catch (NullPointerException ex) {
			responseBody.put("message", "Cannot find the novel with the given id");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
		}

		responseBody = mapper.valueToTree(novel);
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}
}
