import type { ReactElement } from 'react';

interface VimrcHighlighterProps {
  content: string;
}

export function VimrcHighlighter({ content }: VimrcHighlighterProps) {
  const lines = content.split('\n');

  const highlightLine = (line: string): ReactElement => {
    // Empty line
    if (!line.trim()) {
      return <span key={line}>&nbsp;</span>;
    }

    // Comment line
    if (line.trim().startsWith('"')) {
      return <span key={line} className="text-gray-500">{line}</span>;
    }

    // Handle mixed content (code + inline comment)
    const commentIndex = line.indexOf('"');
    if (commentIndex > 0) {
      const codePart = line.substring(0, commentIndex);
      const commentPart = line.substring(commentIndex);
      return (
        <span key={line}>
          {highlightCode(codePart)}
          <span className="text-gray-500">{commentPart}</span>
        </span>
      );
    }

    return highlightCode(line);
  };

  const highlightCode = (code: string): ReactElement => {
    let result = code;

    // Highlight Plug statements first (before general processing)
    // Plug 'repo' or Plug 'repo', { 'branch': 'name' }
    result = result.replace(
      /\b(Plug\s+)('[^']+')(\s*,\s*\{\s*'branch':\s*'([^']+)'\s*\})?/g,
      (match, plug, repo, _branch, branchName) => {
        let html = '<span class="text-purple-400">Plug </span>';
        html += `<span class="text-cyan-400">${repo}</span>`;
        if (branchName) {
          html += '<span class="text-gray-300">, </span>';
          html += `<span class="text-gray-300">{ </span>`;
          html += `<span class="text-yellow-400">'branch'</span>`;
          html += `<span class="text-gray-300">: </span>`;
          html += `<span class="text-green-400">'${branchName}'</span>`;
          html += `<span class="text-gray-300"> }</span>`;
        }
        return html;
      }
    );

    // Highlight call plug#begin/end
    result = result.replace(
      /\b(call\s+plug#(?:begin|end)\([^)]*\))/g,
      '<span class="text-purple-400">$1</span>'
    );

    // Highlight set commands
    // Pattern: set option or set option=value
    result = result.replace(
      /\b(set)\s+(\w+)(?:=([^\s]+))?/g,
      (match, cmd, opt, val) => {
        let html = `<span class="text-blue-400">${cmd}</span> `;
        // Handle no prefix
        if (opt.startsWith('no')) {
          html += `<span class="text-orange-400">no</span><span class="text-green-400">${opt.slice(2)}</span>`;
        } else if (opt.startsWith('inv')) {
          html += `<span class="text-orange-400">inv</span><span class="text-green-400">${opt.slice(3)}</span>`;
        } else {
          html += `<span class="text-green-400">${opt}</span>`;
        }
        if (val) {
          html += `<span class="text-gray-300">=</span>`;
          // Check if value is a number
          if (/^\d+$/.test(val)) {
            html += `<span class="text-orange-400">${val}</span>`;
          } else {
            html += `<span class="text-pink-400">${val}</span>`;
          }
        }
        return html;
      }
    );

    // Highlight syntax, filetype, colorscheme commands
    result = result.replace(
      /\b(syntax|filetype|indent|colorscheme)\s+(\w+)/g,
      '<span class="text-blue-400">$1</span> <span class="text-pink-400">$2</span>'
    );

    // Highlight background setting
    result = result.replace(
      /\b(background)\s*=\s*(dark|light)/g,
      '<span class="text-blue-400">$1</span>=<span class="text-pink-400">$2</span>'
    );

    // Highlight numbers (standalone, not already highlighted)
    result = result.replace(
      /(?<!class="text-[^"]*")(\b\d+\b)(?![^<]*>)/g,
      '<span class="text-orange-400">$1</span>'
    );

    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <pre className="whitespace-pre-wrap">
      {lines.map((line, index) => (
        <div key={index}>{highlightLine(line)}</div>
      ))}
    </pre>
  );
}
