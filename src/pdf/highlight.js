import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Document, Page, pdfjs} from 'react-pdf';

import samplePDF from '../test.pdf';

function highlightPattern(text, pattern) {
  return text.replace(pattern, (value) => `<mark>${value}</mark>`);
}

export default function Highlight() {

  const [searchText, setSearchText] = useState('');

  const textRenderer = useCallback(
    (textItem) => highlightPattern(textItem.str, searchText),
    [searchText]
  );

  function onChange(event) {
    setSearchText(event.target.value);
  }

  useEffect(()=>{
    pdfjs.GlobalWorkerOptions.workerSrc =
`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  },[])

  return (
    <>
        <div>
        <label htmlFor="search">Search:</label>
        <input type="search" id="search" value={searchText} onChange={onChange} />
      </div>
      <Document file={samplePDF}>
        <Page
          pageNumber={1}
          customTextRenderer={textRenderer}
        />
      </Document>
    </>
  );
}