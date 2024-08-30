import {defineQuery} from 'next-sanity'

export const UPCOMING_EVENTS_QUERY = defineQuery(
  `*[_type == "event" && startAt >= now()][0...9]{
    title,
    slug,
    startAt,
    location,
    image
  }`,
)

export const PAST_EVENTS_QUERY = defineQuery(
  `*[_type == "event" && startAt < now()][0...9]{
    title,
    slug,
    startAt,
    location,
    image,
    speakers[]-> {
      name,
      headshot
    }
  }`,
)

export const EVENT_QUERY = defineQuery(
  `*[_type == "event" && slug.current == $slug][0]{
    ...,
    speakers[]-> {
      name,
      headshot
    },
    "relatedEvents": *[_type == "event" && startAt >= now() && slug.current != $slug][0...3]{
      title,
      slug,
      startAt,
      location,
      image
    }
  }`,
)
