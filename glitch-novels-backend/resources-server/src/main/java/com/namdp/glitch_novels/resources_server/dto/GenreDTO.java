package com.namdp.glitch_novels.resources_server.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.namdp.glitch_novels.resources_server.entities.Genre;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GenreDTO {
  private Integer id;
  private String title;
  private String description;
  private List<NovelDTO> novels;

  /**
   * Map a genre record in the database to its corresponding api instance.
   *
   * @param dbGenre    The genre record in the database
   * @param isAbridged Should add the list of novels containing this genre or not
   * @return Corresponding api instance
   */
  public static GenreDTO mapEntity(Genre dbGenre, boolean isAbridged) {
    GenreDTOBuilder builder = GenreDTO.builder();
    builder
        .id(dbGenre.getId())
        .title(dbGenre.getTitle())
        .description(dbGenre.getDescription());

    if (!isAbridged) {
      // TODO add list of novels
    }

    return builder.build();
  }
}
