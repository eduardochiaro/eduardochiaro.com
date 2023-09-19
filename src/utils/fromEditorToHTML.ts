import edjsHTML from 'editorjs-html';
import stripTags from './stripTags';

function customDelimiter() {
  return '<hr/>';
}

const fromEditorToHTML = (blocks: string) => {
  const edjsParser = edjsHTML({ delimiter: customDelimiter });
  const content = edjsParser.parse(JSON.parse(blocks));

  return { content: content.join('\n'), plaintext: stripTags(content.join('\n\n')) };
};

export default fromEditorToHTML;
