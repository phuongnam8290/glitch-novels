package com.namdp.glitch_novels.resources_server.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.namdp.glitch_novels.resources_server.entities.Chapter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Builder
@Data
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ChapterDTO {
  private Integer id;
  private double number;
  private String title;
  private String content;
  private LocalDateTime createdDate;
  private NovelDTO novel;
  private Integer previousChapterId;
  private Integer nextChapterId;

  /**
   * Map a chapter record in the database to its corresponding api instance.
   *
   * @param dbChapter  The chapter record in the database
   * @param isAbridged Should add chapter's content or not
   * @return Corresponding api instance
   */
  public static ChapterDTO mapEntity(Chapter dbChapter, boolean isAbridged) {
    ChapterDTOBuilder builder = ChapterDTO.builder();
    builder
        .id(dbChapter.getId())
        .number(dbChapter.getNumber())
        .title(dbChapter.getTitle())
        .createdDate(dbChapter.getCreatedDate())
        .novel(NovelDTO.builder()
            .id(dbChapter.getNovel().getId())
            .title(dbChapter.getNovel().getTitle())
            .build())
        .previousChapterId(dbChapter.getPreviousChapter() != null ? dbChapter.getPreviousChapter().getId() : null)
        .nextChapterId(dbChapter.getNextChapter() != null ? dbChapter.getNextChapter().getId() : null);

    if (!isAbridged) {
      builder.content(dbChapter.getContent());
    }

    return builder.build();
  }
}
