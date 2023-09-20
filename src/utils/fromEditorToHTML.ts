import edjsHTML from 'editorjs-html';
import stripTags from './stripTags';

function customDelimiter() {
  return '<hr/>';
}

function customImage({ data }: {data: any}) {
	let caption = data.caption ? data.caption : "Image";
	return `<div class="imageBlock ${data.withBorder ? 'withBorder' : '' } ${data.stretched ? 'stretched' : '' }  ${data.withBackground ? 'withBackground' : '' }"><img src="${
		data.file && data.file.url ? data.file.url : data.url
	}" alt="${caption}" /></div>`;
}

const fromEditorToHTML = (blocks: string) => {
  const edjsParser = edjsHTML({ delimiter: customDelimiter, image: customImage });
  const content = edjsParser.parse(JSON.parse(blocks));

  return { content: content.join('\n'), plaintext: stripTags(content.join('\n\n')) };
};

export default fromEditorToHTML;
