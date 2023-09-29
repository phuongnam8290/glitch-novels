package com.namdp.glitch_novels.resources_server.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "publication_status")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class PublicationStatus {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "publication_status_id")
	private Integer id;

	@Column(name = "publication_status_title")
	private String title;

	@Column(name = "publication_status_description")
	private String description;

	@OneToMany(mappedBy = "publicationStatus")
	@ToString.Exclude
	private List<Novel> novels;

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		PublicationStatus that = (PublicationStatus) o;
		return Objects.equals(id, that.id) && Objects.equals(title, that.title) && Objects.equals(description, that.description) && Objects.equals(novels, that.novels);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, title, description, novels);
	}
}
