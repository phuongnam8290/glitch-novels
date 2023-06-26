package com.namdp.glitch_novels.resources_server.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.namdp.glitch_novels.resources_server.dto.NovelDTO;
import com.namdp.glitch_novels.resources_server.services.NovelService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class NovelController {
  private final ObjectMapper mapper;
  private final NovelService novelService;

  public NovelController(ObjectMapper mapper, NovelService novelService) {
    this.mapper = mapper;
    this.novelService = novelService;
  }

  @GetMapping("/novels")
  public ObjectNode findAllNovels() {
    ObjectNode response = mapper.createObjectNode();

    // Get all novels in the db, then convert them to json node for serialization.
    List<NovelDTO> novels = novelService.findAll();
    JsonNode novelsNode = mapper.valueToTree(novels);

    // Build response json.
    response.put("total", novels.size());
    response.set("novels", novelsNode);

    return response;
  }

  @DeleteMapping("/novels")
  public ResponseEntity<Map<String, Object>> deleteNovels(@RequestBody List<Integer> ids) {
    Map<String, Object> responseBody = new HashMap<>();

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
    responseBody.put("deletedNovel", deletedNovels);
    return ResponseEntity.ok(responseBody);
  }

  @GetMapping("/novel/{id}")
  public NovelDTO findNovelById(@PathVariable("id") int id) {
    return novelService.findById(id);
  }

  @GetMapping("search/novels")
  public ResponseEntity<Map<String, Object>> searchNovels(@RequestParam String keyword) {
    Map<String, Object> responseBody = new HashMap<>();

    keyword = keyword.trim();
    if (keyword.isEmpty()) {
      responseBody.put("message", "Keyword cannot be empty.");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    List<NovelDTO> searchResults = novelService.searchNovels(keyword);
    if (searchResults.isEmpty()) {
      responseBody.put("message", "No result found.");
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
    }

    responseBody.put("searchResults", searchResults);
    return ResponseEntity.status(HttpStatus.OK).body(responseBody);
  }
}
