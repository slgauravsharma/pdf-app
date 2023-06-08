import React, { useState, useCallback } from 'react';
import { Document, Page,pdfjs } from 'react-pdf';

// https://github.com/wojtekmaj/react-pdf/wiki/Recipes#highlight-text-on-the-page

const url =
"https://cors-anywhere.herokuapp.com/http://www.pdf995.com/samples/pdf.pdf";

function highlightPattern(text, pattern) {
  return text.replace(pattern, (value) => `<mark>${value}</mark>`);
}

export default function Test() {
	
pdfjs.GlobalWorkerOptions.workerSrc =
`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const [numPages, setNumPages] = useState(null);
const [pageNumber, setPageNumber] = useState(1);

// ---
const [searchText, setSearchText] = useState('');

/*To Prevent right click on screen*/
document.addEventListener("contextmenu", (event) => {
	event.preventDefault();
});
	
/*When document gets loaded successfully*/
function onDocumentLoadSuccess({ numPages }) {
	setNumPages(numPages);
	setPageNumber(1);
}

function changePage(offset) {
	setPageNumber(prevPageNumber => prevPageNumber + offset);
}

function previousPage() {
	changePage(-1);
}

function nextPage() {
	changePage(1);
}


// --
const textRenderer = useCallback(
    (textItem) => highlightPattern(textItem.str, searchText),
    [searchText]
  );

  function onChange(event) {
    setSearchText(event.target.value);
  }

return (
	<>
	<div className="main">
    <div>
        <label htmlFor="search">Search:</label>
        <input type="search" id="search" value={searchText} onChange={onChange} />
      </div>
	<div>
	<Document
		file={url}
		onLoadSuccess={onDocumentLoadSuccess}
	>
		<Page pageNumber={pageNumber} />
	</Document>
		<div className="pagec">
		Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
		</div>
		<div className="buttonc">
		<button
		type="button"
		disabled={pageNumber <= 1}
		onClick={previousPage}
		className="Pre"
			
		>
		Previous
		</button>
		<button
		type="button"
		disabled={pageNumber >= numPages}
		onClick={nextPage}
		
		>
		Next
		</button>
		</div>
	</div>
	</div>
	</>
);
}
