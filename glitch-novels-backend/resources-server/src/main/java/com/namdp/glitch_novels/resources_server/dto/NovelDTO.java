package com.namdp.glitch_novels.resources_server.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.namdp.glitch_novels.resources_server.entities.Chapter;
import com.namdp.glitch_novels.resources_server.entities.Genre;
import com.namdp.glitch_novels.resources_server.entities.Novel;
import com.namdp.glitch_novels.resources_server.entities.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Singular;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Data
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class NovelDTO {
  private Integer id;
  private String title;
  private String coverUrl;
  private String description;
  private LocalDateTime createdDate;
  private LocalDateTime lastUpdatedDate;
  private AuthorDTO author;

  @Singular
  private List<ChapterDTO> chapters;

  @Singular
  private List<GenreDTO> genres;

  @Singular
  private List<TagDTO> tags;

  /**
   * Map a novel record in the database to its corresponding api instance.
   *
   * @param dbNovel    The novel record in the database
   * @param isAbridged Placeholder parameter
   * @return Corresponding api instance
   */
  public static NovelDTO mapEntity(Novel dbNovel, boolean isAbridged) {
    NovelDTOBuilder builder = NovelDTO.builder();
    builder.id(dbNovel.getId())
        .title(dbNovel.getTitle())
        .coverUrl(dbNovel.getCoverUrl())
        .description(dbNovel.getDescription())
        .createdDate(dbNovel.getCreatedDate())
        .lastUpdatedDate(dbNovel.getLastUpdatedDate())
        .author(AuthorDTO.mapEntity(dbNovel.getAuthor(), true));

    for (Chapter dbChapter : dbNovel.getChapters()) {
      ChapterDTO apiChapter = ChapterDTO.mapEntity(dbChapter, true);
      builder.chapter(apiChapter);
    }

    for (Genre dbGenre : dbNovel.getGenres()) {
      GenreDTO apiGenre = GenreDTO.mapEntity(dbGenre, true);
      builder.genre(apiGenre);
    }

    for (Tag dbTag : dbNovel.getTags()) {
      TagDTO apiTag = TagDTO.mapEntity(dbTag, true);
      builder.tag(apiTag);
    }

    return builder.build();
  }
}
