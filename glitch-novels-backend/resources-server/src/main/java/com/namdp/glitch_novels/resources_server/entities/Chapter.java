package com.namdp.glitch_novels.resources_server.entities;

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
public class Chapter {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "chapter_id")
  private Integer id;

  @Column(name = "chapter_number")
  private double number;

  @Column(name = "chapter_title")
  private String title;

  @Column(name = "chapter_content")
  private String content;

  @Column(name = "chapter_created_date")
  private LocalDateTime createdDate;

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
