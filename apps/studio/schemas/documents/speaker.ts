import {defineType, defineField} from 'sanity'
import {UserIcon, UsersIcon} from '@sanity/icons'

interface PrepareReturnType {
  title: string
  subtitle: string
  media: any
}

export const person = defineType({
  type: 'document',
  name: 'speaker',
  title: 'Speakers',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'headshot',
      title: 'Head Shot',
      type: 'image',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      headshot: 'headshot',
      byline: 'byline',
    },
    prepare({name, headshot, byline}): PrepareReturnType {
      return {
        title: name,
        subtitle: byline,
        media: headshot ?? UserIcon,
      }
    },
  },
})
