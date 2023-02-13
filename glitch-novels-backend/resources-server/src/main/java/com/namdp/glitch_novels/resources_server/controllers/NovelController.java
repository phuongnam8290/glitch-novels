package com.namdp.glitch_novels.resources_server.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.namdp.glitch_novels.resources_server.dto.NovelDTO;
import com.namdp.glitch_novels.resources_server.services.NovelService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class NovelController {
  private final ObjectMapper mapper;
  private final NovelService novelService;

  public NovelController(ObjectMapper mapper, NovelService novelService) {
    this.mapper = mapper;
    this.novelService = novelService;
  }

  @GetMapping("/titles")
  public ObjectNode listAll() {
    ObjectNode response = mapper.createObjectNode();

    // Get all novels in the db, then convert them to json node for serialization.
    List<NovelDTO> novels = novelService.findAll();
//    List<Novel> novels = novelService.findAll();
    JsonNode titles = mapper.valueToTree(novels);

    // Build response json.
    response.put("total", novels.size());
    response.set("titles", titles);

    return response;
  }
}
