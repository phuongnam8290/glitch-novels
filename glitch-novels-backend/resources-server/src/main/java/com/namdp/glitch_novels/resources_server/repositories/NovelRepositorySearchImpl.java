package com.namdp.glitch_novels.resources_server.repositories;

import com.namdp.glitch_novels.resources_server.entities.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.*;

import java.util.List;

public class NovelRepositorySearchImpl implements NovelRepositorySearch {
	@PersistenceContext
	private EntityManager entityManager;

	/**
	 * Search novels in the db using multiple criteria.
	 *
	 * @param title                   Part of the novel's title.
	 * @param authorName              Part of the author's name.
	 * @param publicationStatusTitles List of publication statuses. The novels must have at least one of these statuses.
	 * @param genreTitles             List of genres. The novels must have at least one of these genres.
	 * @param tagTitles               List of tags. The novels must have at least one of these tags.
	 * @return List of novels that match the search's criteria.
	 */
	@Override
	public List<Novel> searchNovelsWithCriteria(String title, String authorName, List<String> publicationStatusTitles,
																							List<String> genreTitles, List<String> tagTitles) {
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<Novel> query = cb.createQuery(Novel.class);

		// Using this predicate to signify always true condition, used when the query is empty.
		Predicate alwaysTruePredicate = cb.isTrue(cb.literal(true));

		Root<Novel> novelRoot = query.from(Novel.class);

		// If the novel's title query is empty, it means that select all the novels. In this case, the predicate will be
		// true. Otherwise, select the novel with title contains string query.
		Predicate titlePredicate = title.isEmpty() ? alwaysTruePredicate : cb.like(novelRoot.get("title"), "%" + title + "%");

		// Use left join to include novels that do not hava author. Necessary because if use inner join, these novels
		// will be discarded before where clause apply to them.
		Join<Novel, Author> authorJoin = novelRoot.join("author", JoinType.LEFT);
		Predicate authorPredicate = authorName.isEmpty() ? alwaysTruePredicate : cb.like(authorJoin.get("name"), "%" + authorName + "%");

		Join<Novel, PublicationStatus> publicationStatusJoin = novelRoot.join("publicationStatus", JoinType.LEFT);
		Predicate publicationStatusPredicate =
				publicationStatusTitles.isEmpty() ? alwaysTruePredicate :
						publicationStatusJoin.get("title").in(publicationStatusTitles);

		Join<Novel, Genre> genreJoin = novelRoot.join("genres", JoinType.LEFT);
		Predicate genrePredicate = genreTitles.isEmpty() ? alwaysTruePredicate : genreJoin.get("title").in(genreTitles);

		Join<Novel, Tag> tagJoin = novelRoot.join("tags", JoinType.LEFT);
		Predicate tagPredicate = tagTitles.isEmpty() ? alwaysTruePredicate : tagJoin.get("title").in(tagTitles);

		// The final predicate will be true when and only when all previous predicates is true.
		Predicate finalPredicate = cb.and(titlePredicate, authorPredicate, publicationStatusPredicate, genrePredicate,
				tagPredicate);

		query.select(novelRoot);
		query.where(finalPredicate);

		// Use distinct to discard duplicated results.
		query.distinct(true);
		query.orderBy(cb.asc(novelRoot.get("title")));
		return entityManager.createQuery(query).getResultList();
	}
}
