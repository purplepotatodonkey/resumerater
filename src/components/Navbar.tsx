import React, {useState} from 'react';
import logo from '../logo.svg';
import '../App.css';

interface State {
    file: File | undefined;
  }

export class Navbar extends React.Component<Props,State> {

    constructor(props: Props) {
        super(props);
        this.state = {
          file: undefined,
        };
      }

    async uploadPdf() {
        const formData = new FormData();
        formData.append("file", this.state.file);
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        // Process the response from the server
      }

    handlePdfChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files[0];
        // Store the file in a state variable or pass it to a prop
        this.setState({ file });
      }

      renderPdfPreview() {
        if (this.state.file) {
          const fileReader = new FileReader();
          fileReader.onloadend = (event) => {
            const fileDataUrl = event.target?.result;
            if (fileDataUrl) {
              return <iframe src={fileDataUrl} />;
            }
          };
          fileReader.readAsDataURL(this.state.file);
        }
      }

    render(): React.ReactNode {
        return (
          <input
            type="file"
            accept="application/pdf"
            onChange={(event) => this.handlePdfChange(event)}
          />
        );
      }
}

export default Navbar;
