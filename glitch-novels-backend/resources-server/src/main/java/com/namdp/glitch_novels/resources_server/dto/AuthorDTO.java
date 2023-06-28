package com.namdp.glitch_novels.resources_server.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.namdp.glitch_novels.resources_server.entities.Author;
import com.namdp.glitch_novels.resources_server.entities.Novel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Singular;

import java.util.List;

@Builder
@Data
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthorDTO {
  private Integer id;
  private String name;

  @Singular
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
      for (Novel dbNovel : dbAuthor.getNovels()) {
        NovelDTO apiNovel = new NovelDTO();
        apiNovel.setId(dbNovel.getId());
        apiNovel.setTitle(dbNovel.getTitle());

        builder.novel(apiNovel);
      }
    }

    return builder.build();
  }
}
