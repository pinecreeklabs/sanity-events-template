import {defineType, defineField} from 'sanity'
import {CalendarIcon} from '@sanity/icons'

interface PrepareReturnType {
  title: string
  subtitle: string
  media: any
}

export const event = defineType({
  type: 'document',
  name: 'event',
  title: 'Events',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'startAt',
      title: 'Start Date/Time',
      type: 'datetime',
    }),
    defineField({
      name: 'endAt',
      title: 'End Date/Time',
      type: 'datetime',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
    defineField({
      name: 'speakers',
      title: 'Speakers',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'speaker'}]}],
    }),
    defineField({
      name: 'recordingLink',
      title: 'Recording Link',
      description: 'If the event has a video recording, you can add the link here.',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'image',
    },
    prepare({title, date, media}): PrepareReturnType {
      return {
        title: title,
        subtitle: date,
        media: media ?? CalendarIcon,
      }
    },
  },
})
