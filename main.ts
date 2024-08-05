import Vorpal, { Args } from "vorpal";

const cli = new Vorpal();

cli.command("run <file>", "Input a query file and run it.").action(async function (args: Args) {
    this.log(args.file);
});

cli.delimiter("fqs$").show();
