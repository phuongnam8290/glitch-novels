package com.namdp.glitch_novels.resources_server.services;

import com.namdp.glitch_novels.resources_server.entities.Chapter;
import com.namdp.glitch_novels.resources_server.entities.Novel;
import com.namdp.glitch_novels.resources_server.repositories.NovelRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class NovelService {
  private final NovelRepository novelRepository;

  public NovelService(NovelRepository novelRepository) {
    this.novelRepository = novelRepository;
  }

  @Transactional
  List<Novel> findAll() {
    return novelRepository.findAll();
  }

  /**
   * List all novels in the database, excluding their content. Use for lighter response object.
   *
   * @return List of novels in the database, excluding their content.
   */
  public List<Novel> listAll() {
    List<Novel> novels = findAll();

    // Expunge novels' content.
    for (Novel novel : novels) {
      List<Chapter> chapters = novel.getChapters();
      for (Chapter chapter : chapters) {
        chapter.setContent(null);
      }
    }

    return novels;
  }
}
