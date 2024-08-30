import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {media} from 'sanity-plugin-media'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID!
const dataset = process.env.SANITY_STUDIO_DATASET!

export default defineConfig({
  name: 'default',
  title: 'events-mgmt',

  projectId,
  dataset,
  plugins: [structureTool(), visionTool(), media()],
  scheduledPublishing: {
    enabled: false,
  },
  schema: {
    types: schemaTypes,
  },
})
