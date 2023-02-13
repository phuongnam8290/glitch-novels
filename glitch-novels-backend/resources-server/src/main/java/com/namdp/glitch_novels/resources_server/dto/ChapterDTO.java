package com.namdp.glitch_novels.resources_server.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
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
  private String name;
  private String content;
  private LocalDateTime createdDate;
  private NovelDTO novel;
}
