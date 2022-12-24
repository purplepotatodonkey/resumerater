import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';

export class Display extends React.Component {
	state = { numPages: null, pageNumber: 1 };

	onDocumentLoadSuccess = ({ numPages }) => {
		this.setState({ numPages });
	};

	goToPrevPage = () =>
		this.setState((state) => ({ pageNumber: state.pageNumber - 1 }));
	goToNextPage = () =>
		this.setState((state) => ({ pageNumber: state.pageNumber + 1 }));

	render() {
		const { pageNumber, numPages } = this.state;

		return (
			<div>
				<nav>
					<button onClick={this.goToPrevPage}>Prev</button>
					<button onClick={this.goToNextPage}>Next</button>
				</nav>

				<div style={{ width: 600 }}>
					<Document
						file="../files/resume.pdf"
						onLoadSuccess={this.onDocumentLoadSuccess}
					>
						<Page pageNumber={pageNumber} width={600} />
					</Document>
				</div>

				<p>
					Page {pageNumber} of {numPages}
				</p>
			</div>
		);
	}

}

{/* <object data="http://africau.edu/images/default/sample.pdf" type="application/pdf" width="100%" height="100%">
<p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p>
</object> */}