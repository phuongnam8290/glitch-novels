package com.namdp.glitch_novels.resources_server.services;

import com.namdp.glitch_novels.resources_server.dto.AuthorDTO;
import com.namdp.glitch_novels.resources_server.dto.ChapterDTO;
import com.namdp.glitch_novels.resources_server.dto.GenreDTO;
import com.namdp.glitch_novels.resources_server.dto.NovelDTO;
import com.namdp.glitch_novels.resources_server.entities.Chapter;
import com.namdp.glitch_novels.resources_server.entities.Genre;
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
//    return novelRepository.findAll();


    List<NovelDTO> apiNovels = new ArrayList<>();

    // Expunge novels' content.
    for (Novel dbNovel : dbNovels) {
      AuthorDTO apiAuthor = AuthorDTO.builder()
          .id(dbNovel.getAuthor().getId())
          .name(dbNovel.getAuthor().getName())
          .build();

      NovelDTO.NovelDTOBuilder builder = NovelDTO.builder();
      builder.id(dbNovel.getId())
          .title(dbNovel.getTitle())
          .coverUrl(dbNovel.getCoverUrl())
          .description(dbNovel.getDescription())
          .createdDate(dbNovel.getCreatedDate())
          .lastUpdateDate(dbNovel.getLastUpdateDate())
          .author(apiAuthor);

      for (Chapter dbChapter : dbNovel.getChapters()) {
        ChapterDTO apiChapter = ChapterDTO.builder()
            .id(dbChapter.getId())
            .number(dbChapter.getNumber())
            .name(dbChapter.getName())
            .createdDate(dbChapter.getCreatedDate())
            .build();

        builder.chapter(apiChapter);
      }

      for (Genre dbGenre : dbNovel.getGenres()) {
        GenreDTO apiGenre = GenreDTO.builder()
            .id(dbGenre.getId())
            .name(dbGenre.getName())
            .description(dbGenre.getDescription())
            .build();

        builder.genre(apiGenre);
      }

      NovelDTO apiNovel = builder.build();
      apiNovels.add(apiNovel);
//      List<Chapter> chapters = novel.getChapters();
//      for (Chapter chapter : chapters) {
//        chapter.setContent(null);
//      }
    }

    return apiNovels;
  }
}
