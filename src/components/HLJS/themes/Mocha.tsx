"use client";

interface Latte {
  active: boolean;
}

export default function Latte({ active }: Latte) {
  if (!active) return null;
  return (
    <style
      jsx
      global>{`
      /** The catppuccin color theme for highlight.js */
      code.hljs {
        color: #cdd6f4;
        background: #1e1e2e;
      }
      code .hljs-keyword {
        color: #cba6f7;
      }
      code .hljs-built_in {
        color: #f38ba8;
      }
      code .hljs-type {
        color: #f9e2af;
      }
      code .hljs-literal {
        color: #fab387;
      }
      code .hljs-number {
        color: #fab387;
      }
      code .hljs-operator {
        color: #94e2d5;
      }
      code .hljs-punctuation {
        color: #bac2de;
      }
      code .hljs-property {
        color: #94e2d5;
      }
      code .hljs-regexp {
        color: #f5c2e7;
      }
      code .hljs-string {
        color: #a6e3a1;
      }
      code .hljs-char.escape_ {
        color: #a6e3a1;
      }
      code .hljs-subst {
        color: #a6adc8;
      }
      code .hljs-symbol {
        color: #f2cdcd;
      }
      code .hljs-variable {
        color: #cba6f7;
      }
      code .hljs-variable.language_ {
        color: #cba6f7;
      }
      code .hljs-variable.constant_ {
        color: #fab387;
      }
      code .hljs-title {
        color: #89b4fa;
      }
      code .hljs-title.class_ {
        color: #f9e2af;
      }
      code .hljs-title.function_ {
        color: #89b4fa;
      }
      code .hljs-params {
        color: #cdd6f4;
      }
      code .hljs-comment {
        color: #585b70;
      }
      code .hljs-doctag {
        color: #f38ba8;
      }
      code .hljs-meta {
        color: #fab387;
      }
      code .hljs-section {
        color: #89b4fa;
      }
      code .hljs-tag {
        color: #a6adc8;
      }
      code .hljs-name {
        color: #cba6f7;
      }
      code .hljs-attr {
        color: #89b4fa;
      }
      code .hljs-attribute {
        color: #a6e3a1;
      }
      code .hljs-bullet {
        color: #94e2d5;
      }
      code .hljs-code {
        color: #a6e3a1;
      }
      code .hljs-emphasis {
        color: #f38ba8;
        font-style: italic;
      }
      code .hljs-strong {
        color: #f38ba8;
        font-weight: bold;
      }
      code .hljs-formula {
        color: #94e2d5;
      }
      code .hljs-link {
        color: #74c7ec;
        font-style: italic;
      }
      code .hljs-quote {
        color: #a6e3a1;
        font-style: italic;
      }
      code .hljs-selector-tag {
        color: #f9e2af;
      }
      code .hljs-selector-id {
        color: #89b4fa;
      }
      code .hljs-selector-class {
        color: #94e2d5;
      }
      code .hljs-selector-attr {
        color: #cba6f7;
      }
      code .hljs-selector-pseudo {
        color: #94e2d5;
      }
      code .hljs-template-tag {
        color: #f2cdcd;
      }
      code .hljs-template-variable {
        color: #f2cdcd;
      }
      code .hljs-diff-addition {
        color: #a6e3a1;
        background: rgba(166, 227, 161, 0.15);
      }
      code .hljs-diff-deletion {
        color: #f38ba8;
        background: rgba(243, 139, 168, 0.15);
      }
    `}</style>
  );
}
