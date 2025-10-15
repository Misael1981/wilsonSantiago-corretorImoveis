"use client"

import styled from "styled-components"

const StyledArticleContent = styled.div`
  max-width: 90ch;
  color: #1f2937;
  font-family: var(--font-playfair), Georgia, "Times New Roman", serif;
  line-height: 1.8;
  margin: 0 auto;

  h1,
  h2,
  h3,
  h4 {
    color: #111827;
    font-family: var(--font-playfair), Georgia, "Times New Roman", serif;
    font-weight: 700;
    margin: 2rem 0 1rem;
    line-height: 1.3;
  }
  h1 {
    font-size: clamp(1.75rem, 2.8vw, 2.5rem);
    border-top: 3px double #e5e7eb;
    padding-top: 1rem;
  }
  h2 {
    font-size: clamp(1.5rem, 2.4vw, 2rem);
    border-top: 2px solid #e5e7eb;
    padding-top: 0.75rem;
  }
  h3 {
    font-size: clamp(1.25rem, 2vw, 1.5rem);
  }

  p {
    margin: 1rem 0;
  }
  ul,
  ol {
    padding-left: 1.25rem;
    margin: 0.75rem 0 1rem;
  }
  li {
    margin: 0.25rem 0;
  }
  a {
    color: #1d4ed8;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  blockquote {
    border-left: 4px solid #d1d5db;
    padding-left: 1rem;
    margin: 1.25rem 0;
    color: #374151;
    font-style: italic;
    background: #f9fafb;
  }

  img {
    border-radius: 0.5rem;
    margin: 1rem 0;
  }

  pre,
  code {
    font-family:
      ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
      "Courier New", monospace;
  }
  pre {
    background: #0b1020;
    color: #e5e7eb;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1rem 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
  }
  th,
  td {
    border: 1px solid #e5e7eb;
    padding: 0.5rem;
  }
  th {
    background: #f3f4f6;
  }
`

export default function ArticleContentStyled({ html }) {
  return <StyledArticleContent dangerouslySetInnerHTML={{ __html: html }} />
}
