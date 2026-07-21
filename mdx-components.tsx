import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return getText((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

const components = {
  h2: ({ children, ...props }) => {
    const id = slugify(getText(children));
    return (
      <h2
        id={id}
        className="mb-4 mt-12 scroll-mt-32 text-2xl font-semibold text-white first:mt-0"
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    const id = slugify(getText(children));
    return (
      <h3 id={id} className="mb-3 mt-8 scroll-mt-32 text-xl font-semibold text-white" {...props}>
        {children}
      </h3>
    );
  },
  p: (props) => <p className="mb-4 leading-relaxed" {...props} />,
  ul: (props) => <ul className="mb-4 list-disc space-y-2 pl-6" {...props} />,
  ol: (props) => <ol className="mb-4 list-decimal space-y-2 pl-6" {...props} />,
  li: (props) => <li className="leading-relaxed" {...props} />,
  a: (props) => <a className="text-[#FF5F15] hover:underline" {...props} />,
  strong: (props) => <strong className="font-semibold text-white/90" {...props} />,
  hr: (props) => <hr className="my-12 border-white/10" {...props} />,
  blockquote: (props) => (
    <blockquote className="border-l-2 border-[#FF5F15]/50 pl-4 italic text-white/60" {...props} />
  ),
  table: (props) => (
    <div className="mb-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props) => <thead className="border-b border-white/20 text-white" {...props} />,
  th: (props) => <th className="px-3 py-2 text-left font-semibold" {...props} />,
  td: (props) => <td className="border-b border-white/10 px-3 py-2 align-top" {...props} />,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
