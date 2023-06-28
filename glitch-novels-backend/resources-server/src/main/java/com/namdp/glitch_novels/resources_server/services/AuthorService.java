package com.namdp.glitch_novels.resources_server.services;

import com.namdp.glitch_novels.resources_server.dto.AuthorDTO;
import com.namdp.glitch_novels.resources_server.entities.Author;
import com.namdp.glitch_novels.resources_server.repositories.AuthorRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthorService {
  private final AuthorRepository authorRepository;

  public AuthorService(AuthorRepository authorRepository) {
    this.authorRepository = authorRepository;
  }

  @Transactional
  public List<AuthorDTO> searchAuthor(String keyword) {
    List<Author> dbAuthors = authorRepository.searchAuthorsByNameIgnoreCaseContaining(keyword);
    List<AuthorDTO> apiAuthors = new ArrayList<>();

    for (Author dbAuthor : dbAuthors) {
      AuthorDTO apiAuthor = AuthorDTO.mapEntity(dbAuthor, false);
      apiAuthors.add(apiAuthor);
    }

    return apiAuthors;
  }
}
