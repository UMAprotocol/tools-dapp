import { appendFileSync, mkdirSync, writeFileSync } from "fs";
import { parse } from "ts-command-line-args";

type Args = {
  name: string;
  componentsDirPath?: string;
};

const args = parse<Args>({
  name: { type: String, alias: "n" },
  componentsDirPath: { type: String, alias: "p", optional: true },
});

const { name, componentsDirPath = "src/components" } = args;

if (!name) {
  throw new Error("No name provided");
}

if (name[0].toUpperCase() !== name[0]) {
  throw new Error("Name must be capitalized");
}

const componentDirPath = `${componentsDirPath}/${name}`;
const defaultIndexPath = `${componentDirPath}/index.ts`;
const defaultComponentsIndexPath = `${componentsDirPath}/index.ts`;
const defaultComponentPath = `${componentDirPath}/${name}.tsx`;
const defaultStylePath = `${componentDirPath}/${name}.module.css`;
const componentCode = `import styles from "./${name}.module.css";

export function ${name}() {
  return <div className={styles.wrapper}>${name}</div>;
}\n`;
const styleCode = `.wrapper {
  
}`;
const indexCode = `export * from "./${name}";\n`;
mkdirSync(componentDirPath);
writeFileSync(defaultStylePath, styleCode);
writeFileSync(defaultComponentPath, componentCode);
writeFileSync(defaultIndexPath, indexCode);
appendFileSync(defaultComponentsIndexPath, indexCode);
