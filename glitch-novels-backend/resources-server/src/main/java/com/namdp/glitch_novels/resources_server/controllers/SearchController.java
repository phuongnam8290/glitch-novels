package com.namdp.glitch_novels.resources_server.controllers;

import com.namdp.glitch_novels.resources_server.dto.AuthorDTO;
import com.namdp.glitch_novels.resources_server.dto.NovelDTO;
import com.namdp.glitch_novels.resources_server.services.AuthorService;
import com.namdp.glitch_novels.resources_server.services.NovelService;
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
  private final NovelService novelService;
  private final AuthorService authorService;

  public SearchController(NovelService novelService, AuthorService authorService) {
    this.novelService = novelService;
    this.authorService = authorService;
  }

  @GetMapping("search/")
  public ResponseEntity<Map<String, Object>> searchNovels(@RequestParam String keyword) {
    Map<String, Object> responseBody = new HashMap<>();

    keyword = keyword.trim();
    if (keyword.isEmpty()) {
      responseBody.put("message", "Keyword cannot be empty.");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    List<NovelDTO> searchNovelResults = novelService.searchNovels(keyword);
    responseBody.put("searchNovelsResults", searchNovelResults);

    List<AuthorDTO> searchAuthorResults = authorService.searchAuthor(keyword);
    responseBody.put("searchAuthorResults", searchAuthorResults);

    return ResponseEntity.status(HttpStatus.OK).body(responseBody);
  }
}
