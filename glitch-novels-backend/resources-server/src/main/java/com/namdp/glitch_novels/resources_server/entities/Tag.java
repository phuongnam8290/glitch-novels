package com.namdp.glitch_novels.resources_server.entities;

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
public class Tag {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "tag_id")
  private Integer id;

  @Column(name = "tag_title")
  private String title;

  @Column(name = "tag_description")
  private String description;

  @ManyToMany(mappedBy = "tags")
  @ToString.Exclude
  private List<Novel> novels;

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
    Tag tag = (Tag) o;
    return id != null && Objects.equals(id, tag.id);
  }

  @Override
  public int hashCode() {
    return getClass().hashCode();
  }
}
