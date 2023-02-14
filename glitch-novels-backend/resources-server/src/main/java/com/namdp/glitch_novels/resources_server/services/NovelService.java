package com.namdp.glitch_novels.resources_server.services;

import com.namdp.glitch_novels.resources_server.dto.NovelDTO;
import com.namdp.glitch_novels.resources_server.entities.Novel;
import com.namdp.glitch_novels.resources_server.repositories.NovelRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class NovelService {
  private final NovelRepository novelRepository;

  public NovelService(NovelRepository novelRepository) {
    this.novelRepository = novelRepository;
  }

  /**
   * Find all novels in the database, excluding their content. Use for lighter response object.
   *
   * @return List of novels in the database, excluding their content.
   */
  @Transactional
  public List<NovelDTO> findAll() {
    List<Novel> dbNovels = novelRepository.findAll();
    List<NovelDTO> apiNovels = new ArrayList<>();

    // Expunge novels' content.
    for (Novel dbNovel : dbNovels) {
      NovelDTO apiNovel = NovelDTO.mapEntity(dbNovel, true);
      apiNovels.add(apiNovel);
    }

    return apiNovels;
  }
}
