import type { MDXComponents } from 'mdx/types'

export const components: Readonly<MDXComponents> = {
  h1: (props) => <h2 className="font-mono text-2xl mt-4" {...props} />,
  h2: (props) => (
    <h2
      className="font-mono text-2xl first:mt-0 mt-10 mb-8 font-bold uppercase !tracking-normal"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="font-mono text-xl mt-8 mb-6 font-bold uppercase !tracking-normal"
      {...props}
    />
  ),
  h4: (props) => <h4 className="font-mono" {...props} />,
  h5: (props) => <h5 className="font-mono" {...props} />,
  h6: (props) => <h6 className="font-mono" {...props} />,
  p: (props) => <p className="font-mono my-6" {...props} />,
  a: (props) => <a className="font-mono" {...props} />,
  ul: (props) => <ul className="font-mono" {...props} />,
  ol: (props) => <ol className="font-mono" {...props} />,
  li: (props) => <li className="font-mono" {...props} />,
  blockquote: (props) => <blockquote className="font-mono" {...props} />,
  code: (props) => <code className="font-mono" {...props} />,
  pre: (props) => (
    <pre
      className="rounded-xl text-sm border border-sand-4 py-4 px-4 bg-white dark:bg-black my-6 whitespace-pre-wrap"
      {...props}
    >
      <span>{props.filename}</span>
      {props.children}
    </pre>
  ),
}
