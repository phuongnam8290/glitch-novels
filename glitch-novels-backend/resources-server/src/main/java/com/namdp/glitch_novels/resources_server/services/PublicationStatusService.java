package com.namdp.glitch_novels.resources_server.services;

import com.namdp.glitch_novels.resources_server.dto.PublicationStatusDTO;
import com.namdp.glitch_novels.resources_server.entities.PublicationStatus;
import com.namdp.glitch_novels.resources_server.repositories.PublicationStatusRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class PublicationStatusService {
	private final PublicationStatusRepository publicationStatusRepository;

	public PublicationStatusService(PublicationStatusRepository publicationStatusRepository) {
		this.publicationStatusRepository = publicationStatusRepository;
	}

	/**
	 * Find all publication statuses in the database, excluding the novels associated with it. Use for lighter response
	 * object.
	 *
	 * @return List of publication statuses in the database, excluding the novels associated with it.
	 */
	@Transactional
	public List<PublicationStatusDTO> findAll() {
		List<PublicationStatus> dbPublicationStatuses = publicationStatusRepository.findAll();
		List<PublicationStatusDTO> apiPublicationStatuses = new ArrayList<>();

		for (PublicationStatus dbPublicationStatus : dbPublicationStatuses) {
			PublicationStatusDTO apiPublicationStatus = PublicationStatusDTO.mapEntity(dbPublicationStatus, true);
			apiPublicationStatuses.add(apiPublicationStatus);
		}

		return apiPublicationStatuses;
	}
}
