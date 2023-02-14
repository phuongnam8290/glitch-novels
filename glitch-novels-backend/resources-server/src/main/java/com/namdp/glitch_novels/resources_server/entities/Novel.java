package com.namdp.glitch_novels.resources_server.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Novel {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "novel_title")
  private String title;

  @Column(name = "novel_cover_url")
  private String coverUrl;

  @Column(name = "novel_description")
  private String description;

  @Column(name = "created_date")
  private LocalDateTime createdDate;

  @Column(name = "last_update_date")
  private LocalDateTime lastUpdateDate;

  @ManyToOne
  @JoinColumn(name = "author_id")
  private Author author;

  @OneToMany(mappedBy = "novel")
  @ToString.Exclude
  private List<Chapter> chapters;

  @ManyToMany
  @JoinTable(
      name = "novel_has_genre",
      joinColumns = {@JoinColumn(name = "novel_id")},
      inverseJoinColumns = {@JoinColumn(name = "genre_id")}
  )
  @ToString.Exclude
  private List<Genre> genres;

  @ManyToMany
  @JoinTable(
      name = "novel_has_tag",
      joinColumns = {@JoinColumn(name = "novel_id")},
      inverseJoinColumns = {@JoinColumn(name = "tag_id")}
  )
  @ToString.Exclude
  private List<Tag> tags;

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
    Novel novel = (Novel) o;
    return id != null && Objects.equals(id, novel.id);
  }

  @Override
  public int hashCode() {
    return getClass().hashCode();
  }
}
