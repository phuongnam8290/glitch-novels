package com.namdp.glitch_novels.resources_server.controllers;

import com.namdp.glitch_novels.resources_server.dto.ChapterDTO;
import com.namdp.glitch_novels.resources_server.services.ChapterService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChapterController {
  private final ChapterService chapterService;

  public ChapterController(ChapterService chapterService) {
    this.chapterService = chapterService;
  }

  @GetMapping("/chapter/{id}")
  public ChapterDTO findById(@PathVariable("id") int id) {
    return chapterService.findById(id);
  }
}
