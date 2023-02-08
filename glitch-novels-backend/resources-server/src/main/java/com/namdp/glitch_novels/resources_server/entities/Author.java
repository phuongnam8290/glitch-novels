package com.namdp.glitch_novels.resources_server.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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
public class Author {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "author_name")
  private String name;

  @JsonManagedReference // Prevent circular reference when serialized.
  @OneToMany(mappedBy = "author")
  @ToString.Exclude
  List<Novel> novels;

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
    Author author = (Author) o;
    return id != null && Objects.equals(id, author.id);
  }

  @Override
  public int hashCode() {
    return getClass().hashCode();
  }
}
