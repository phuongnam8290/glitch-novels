package com.namdp.glitch_novels.resources_server.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.namdp.glitch_novels.resources_server.entities.PublicationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PublicationStatusDTO {
	private Integer id;
	private String title;
	private String description;
	private List<NovelDTO> novels;

	public static PublicationStatusDTO mapEntity(PublicationStatus dbPublicationStatus, boolean isAbridged) {
		PublicationStatusDTO.PublicationStatusDTOBuilder builder = PublicationStatusDTO.builder();
		builder
				.id(dbPublicationStatus.getId())
				.title(dbPublicationStatus.getTitle())
				.description(dbPublicationStatus.getDescription());

		if (!isAbridged) {
			// TODO add list of novels
		}

		return builder.build();
	}
}
