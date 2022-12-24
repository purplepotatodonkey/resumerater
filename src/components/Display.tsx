import React from 'react';
import { Document, Page } from 'react-pdf';

export class Display extends React.Component {
    render() {
        return (
            <Document file="../files/resume.pdf">
                <Page pageNumber = {1} />
            </Document>
        )
    }
}

{/* <object data="http://africau.edu/images/default/sample.pdf" type="application/pdf" width="100%" height="100%">
<p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p>
</object> */}