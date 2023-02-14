package com.namdp.glitch_novels.resources_server.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.namdp.glitch_novels.resources_server.entities.Author;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthorDTO {
  private Integer id;
  private String name;
  private List<NovelDTO> novels;

  /**
   * Map an author record in the database to its corresponding api instance.
   *
   * @param dbAuthor   The author record in the database
   * @param isAbridged Should add the author's novels or not
   * @return Corresponding api instance
   */
  public static AuthorDTO mapEntity(Author dbAuthor, boolean isAbridged) {
    AuthorDTOBuilder builder = AuthorDTO.builder();
    builder
        .id(dbAuthor.getId())
        .name(dbAuthor.getName());

    if (!isAbridged) {
      // TODO: add list of novels
    }

    return builder.build();
  }
}
