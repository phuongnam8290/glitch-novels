package com.namdp.glitch_novels.resources_server.repositories;

import com.namdp.glitch_novels.resources_server.entities.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Integer> {

  List<Author> searchAuthorsByNameIgnoreCaseContaining(String name);
}
