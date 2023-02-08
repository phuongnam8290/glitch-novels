package com.namdp.glitch_novels.resources_server.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Chapter {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "chapter_number")
  private double number;

  @Column(name = "chapter_name")
  private String name;

  @JsonInclude(JsonInclude.Include.NON_NULL) // Omit this field when serialized if it doesn't exist (null).
  @Column(name = "content")
  private String content;

  @Column(name = "created_date")
  private LocalDateTime createdDate;

  @JsonBackReference // Prevent circular reference when serialized.
  @ManyToOne
  @JoinColumn(name = "novel_id")
  private Novel novel;

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
    Chapter chapter = (Chapter) o;
    return id != null && Objects.equals(id, chapter.id);
  }

  @Override
  public int hashCode() {
    return getClass().hashCode();
  }
}
