package com.namdp.glitch_novels.resources_server.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
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
  private LocalDateTime lastUpdateDate;
  private AuthorDTO author;

  @Singular
  private List<ChapterDTO> chapters;

  @Singular
  private List<GenreDTO> genres;
}
