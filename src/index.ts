//import * as fs from "node:fs";
import filesystem from "fs/promises";
import { z } from "zod";

console.log("Hello, world");

// DON'T MODIFY THE CODE BELOW THIS LINE

let toExport;

try {
  toExport = [
    { name: "averageNutritions", content: averageNutritions, type: "function" },
    { name: "dataRead", content: dataRead, type: "function" },
  ];
} catch (error) {
  toExport = { error: error.message };
}

export { toExport };
