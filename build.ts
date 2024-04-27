async function build() {
  await Bun.build({
    entrypoints: ["./src/index.ts"],
    outdir: "./dist",
    minify: true,
    format: "esm",
  });
}

build();
