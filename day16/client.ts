import Vorpal, { Args } from "vorpal";
import run from "./run";

const cli = new Vorpal();

cli.command("run <file>", "Input a query file and run it.").action(async function (args: Args) {
    await run(args.file);
});

cli.delimiter("fqs$").show();
