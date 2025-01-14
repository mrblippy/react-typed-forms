import mdx from "@next/mdx";

const withMDX = mdx({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});
export default withMDX({
  pageExtensions: ["tsx", "mdx", "ts"],
  basePath: "/react-typed-forms"
});
