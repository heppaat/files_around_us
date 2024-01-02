//import * as fs from "node:fs";
import { error } from "console";
import filesystem from "fs/promises";
import { z } from "zod";

const fruitSchema = z.object({
  genus: z.string(),
  name: z.string(),
  id: z.number(),
  family: z.string(),
  order: z.string(),
  nutritions: z.object({
    carbohydrates: z.number(),
    protein: z.number(),
    fat: z.number(),
    calories: z.number(),
    sugar: z.number(),
  }),
});

type Fruit = z.infer<typeof fruitSchema>;

const averageNutritions = (data: Fruit[]) => {
  let average = {
    carbohydrates: 0,
    protein: 0,
    fat: 0,
    calories: 0,
    sugar: 0,
  };
  for (let i = 0; i < data.length; i++) {
    const fruit = data[i];
    average.carbohydrates += fruit.nutritions.carbohydrates / data.length;
    average.protein += fruit.nutritions.protein / data.length;
    average.fat += fruit.nutritions.fat / data.length;
    average.calories += fruit.nutritions.calories / data.length;
    average.sugar += fruit.nutritions.sugar / data.length;
  }
  return average;
};

const orderById = (data: Fruit[]) => {
  let dataCopy = [...data];

  dataCopy.sort((a, b) => a.id - b.id);
  return dataCopy;
};

const dataRead = async () => {
  try {
    const input = await filesystem.readFile(
      `${__dirname}/../data.json`,
      "utf-8"
    );
    const jsonData = JSON.parse(input);
    const result = fruitSchema.array().safeParse(jsonData);

    if (!result.success) return console.log(result.error.issues);

    const validatedData = result.data;
    //console.log(averageNutritions(validatedData));
    console.log(orderById(validatedData));
  } catch (error) {
    console.log(error);
  }
};

dataRead();
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
