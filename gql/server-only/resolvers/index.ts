import 'server-only'
import { InputMaybe, Resolvers } from '@/gql/codegen/resolvers-types'
import PierSettings from '@/libs/server-only/PierSettings'
import { PrismaClient } from '@prisma/client'
import System from '@/libs/server-only/System'
import Downloader, { DownloadType } from '@/libs/server-only/Downloader'
import Genre from '@/libs/server-only/collections/Genre'

const prisma = new PrismaClient()

const checkExistingPathThrowingError = (path?: InputMaybe<string>) => {
	if (path === undefined || path === null) return
	if (!System.isAccessible(path)) {
		throw new Error(`Path '${path}' cannot be set as it is not accessible.`)
	}
}

const resolvers: Resolvers = {
	Query: {
		settings: async () => {
			const rawSettings = await PierSettings.getSettings(prisma)
			return { ...rawSettings, downloads: { ...rawSettings.downloads, updatedAt: rawSettings.downloads.updatedAt.toISOString() } }
		},
		genres: async () => {
			return prisma.genre.findMany()
		},
	},
	Mutation: {
		update_settings: async (_, { input }) => {
			if (!input) throw new Error('No input provided')

			checkExistingPathThrowingError(input?.downloads?.path)
			checkExistingPathThrowingError(input?.downloads?.audioPath)
			checkExistingPathThrowingError(input?.downloads?.imagePath)
			checkExistingPathThrowingError(input?.downloads?.videoPath)
			checkExistingPathThrowingError(input?.downloads?.metadataPath)

			const rawSettings = await PierSettings.setSettings(prisma, input)
			return { ...rawSettings, downloads: { ...rawSettings.downloads, updatedAt: rawSettings.downloads.updatedAt.toISOString() } }
		},
		download_audio: async (_, { input: { url, overrideOnCollision } }) => {
			await Downloader.download({ url, type: DownloadType.AUDIO, overrideOnCollision })
			throw Error('Not implemented')
		},
		initialise_genres: async (_, { input }) => {
			await Genre.tryAddDefaults({ overrideExisting: input?.overrideExisting }, prisma)
			return true
		},
	},
}

export default resolvers
