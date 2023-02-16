package com.namdp.glitch_novels.resources_server.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.namdp.glitch_novels.resources_server.entities.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TagDTO {
  private Integer id;
  private String title;
  private String description;
  private List<NovelDTO> novels;

  /**
   * Map a tag record in the database to its corresponding api instance.
   *
   * @param dbTag      The tag record in the database
   * @param isAbridged Should add the list of novels containing this tag or not
   * @return Corresponding api instance
   */
  public static TagDTO mapEntity(Tag dbTag, boolean isAbridged) {
    TagDTO.TagDTOBuilder builder = TagDTO.builder();
    builder
        .id(dbTag.getId())
        .title(dbTag.getTitle())
        .description(dbTag.getDescription());

    if (!isAbridged) {
      // TODO add list of novels
    }

    return builder.build();
  }
}
