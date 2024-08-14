import { stringify } from "jsr:@std/toml"
import * as path from "jsr:@std/path"

export interface MinecraftManifest {
	header: {
		name: string
		description: string
		uuid: string
        min_engine_version: [number, number, number]
        version: [number, number, number]
	}
}

export async function createProjectCfg(manifestPath: string): Promise<string> {
	try {
		// check if file exists
		Deno.chdir(path.dirname(manifestPath))
		await Deno.lstat("manifest.json")
	} catch (error) {
		if (!(error instanceof Deno.errors.NotFound)) {
			throw error
		} else {
			throw new Deno.errors.NotFound(
				"manifest doesn't exist in specified directory"
			)
		}
	}

	const readManifest: MinecraftManifest = JSON.parse(
		await Deno.readTextFile("manifest.json")
	)

	const parsedManifest = {
		info: {
			name: readManifest.header.name,
            description: readManifest.header.description,
            min_mc_version: readManifest.header.min_engine_version,
            uuid: readManifest.header.uuid,
            version: readManifest.header.version
		},
	}

	await Deno.writeTextFile(".fern", stringify(parsedManifest))

	return stringify(parsedManifest)
}
