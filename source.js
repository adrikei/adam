const fs = require("fs");
const CONFUSED = "CONFUSED";

rootList = fs.readdirSync(".");

ignoreList = fs.readFileSync(".gitignore", "utf-8").split("\n");

const traverse = (path) => {
  if (!path || typeof path !== "string") {
    throw CONFUSED;
  }
  if (ignoreList.includes(path)) {
    return;
  }
  if (path.startsWith(".")) {
    return;
  }
  if (!fs.existsSync(path)) {
    throw CONFUSED;
  }
  if (fs.lstatSync(path).isDirectory()) {
    fs.readdirSync(path)
      .filter((e) => !e.startsWith("."))
      .sort()
      .map((e) => path + "/" + e)
      .forEach(traverse);
    return;
  }
  console.log("This is " + path + ":");
  console.log(fs.readFileSync(path, "utf-8"));
};

rootList.sort().forEach(traverse);
