import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts";
import { createProjectCfg } from "./commands/init.ts";

new Command()
	.name("fdk")
	.version("0.1.0")
	.description("Package manager for Minecraft Bedrock")
	.command("init <path:string>", "Initialize a project")
	.action(async (_options: void, path: string) => {
		const tomlCfg = await createProjectCfg(path);
		console.log(tomlCfg, "\n cfg file created!");
	})
	.parse(Deno.args);
