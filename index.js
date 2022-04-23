const readline = require("readline");

const prompt = (promptMessage, digest) => {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question(promptMessage, (input) => {
    digest(input);
    rl.close();
  });
};

const interact = (respondTo) => (input) => {
  console.log("You said:\n" + input);
  if (input === "exit") {
    console.log("kthanxbye");
    process.exit(0);
  }
  const output = respondTo(input);
  console.log("I say:\n" + output);
};

const fallback = () => "I am Adam.";

prompt("> ", interact(fallback));
