import { assertEquals } from "jsr:@std/assert"
import type { MinecraftManifest } from "../src/commands/init.ts"
import { createProjectCfg } from "../src/commands/init.ts"

Deno.test(async function addTest() {
	try {
        const checkOutputDir = await Deno.stat("output")
        if (checkOutputDir.isDirectory) {
            await Deno.remove("output")
            await Deno.mkdir("output")            
        }
	} catch (error) {
		if (error instanceof Deno.errors.NotFound) {
			await Deno.mkdir("output")
		}
	}
    Deno.chdir("output")
    
	console.info("created output dir")

	const dummyManifest: MinecraftManifest = {
		header: {
			name: "dummy",
			description: "dummy pack",
			version: [0, 0, 1],
			min_engine_version: [1, 21, 0],
			uuid: "9eca3b44-6580-4051-bc99-2167dabf90bc",
		},
	}

	await Deno.writeTextFile("manifest.json", JSON.stringify(dummyManifest))

    console.info("created dummy manifest data")
    
	assertEquals(
		await createProjectCfg("manifest.json"),
		`
[info]
name = "dummy"
description = "dummy pack"
min_mc_version = [1,21,0]
uuid = "9eca3b44-6580-4051-bc99-2167dabf90bc"
version = [0,0,1]
`)

	console.info("√ test completed!")
})
