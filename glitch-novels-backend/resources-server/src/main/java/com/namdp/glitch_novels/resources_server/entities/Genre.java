package com.namdp.glitch_novels.resources_server.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;

import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Genre {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "genre_name")
  private String name;

  @Column(name = "genre_description")
  private String description;

  @JsonBackReference // Prevent circular reference when serialized.
  @ManyToMany(mappedBy = "genres")
  @ToString.Exclude
  private List<Novel> novels;

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
    Genre genre = (Genre) o;
    return id != null && Objects.equals(id, genre.id);
  }

  @Override
  public int hashCode() {
    return getClass().hashCode();
  }
}
