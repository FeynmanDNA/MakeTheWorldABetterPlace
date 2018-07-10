import React from 'react';
import HTTPconfig from '../../HTTPconfig';
// for react-pdf
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import 'react-pdf/dist/Page/AnnotationLayer.css';
// pdfs from the Assets folder
import NAR2018 from '../../Assets/PublicationPdfs/2018NAR.pdf';
import Polymers2017 from '../../Assets/PublicationPdfs/Polymers2017.pdf';
import PRE2016 from '../../Assets/PublicationPdfs/PRE2016.pdf';
// antd
import { Card, Button, Icon, Menu } from 'antd';

const ButtonGroup = Button.Group;

class PdfView extends React.Component {
  state = {
    current: "NAR", // for top Menu
    file: NAR2018, // pdf file
    numPages: null, // total number of pages in pdf
    pageNumber: 1, // current page
    Cardtitle: "Publication 1: NAR 2018",
    FilePath: "2018NAR.pdf", // for pdf download
  };

  handleClickMenu = (e) => {
    this.setState({
      current: e.key,
      pageNumber:1,
    });
    switch (e.key) {
      case "NAR":
        this.setState({
          file: NAR2018,
          Cardtitle: "Publication 1: NAR 2018",
          FilePath: "2018NAR.pdf",
        });
        break;
      case "POL":
        this.setState({
          file: Polymers2017,
          Cardtitle: "Publication 2: Polymers 2017",
          FilePath: "Polymers2017.pdf",
        });
        break;
      case "PRE":
        this.setState({
          file: PRE2016,
          Cardtitle: "Publication 3: PRE 2016",
          FilePath: "PRE2016.pdf",
        });
        break;
      default:
        break;
    }
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  onPrevPage = () => {
    this.setState( (prevState) => ({
      pageNumber: prevState.pageNumber-1,
    }))
  }

  onNextPage = () => {
    this.setState( (prevState) => ({
      pageNumber: prevState.pageNumber+1,
    }))
  }

  DisablePrevPage = () => {
    if (this.state.pageNumber === 1) {
      return true;
    } else {
      return false;
    }
  }

  DisableNextPage = () => {
    if (this.state.pageNumber === this.state.numPages) {
      return true;
    } else {
      return false;
    }
  }
  
  render() {
    const { file, numPages, pageNumber, FilePath } = this.state;
    const FileLink = `${HTTPconfig.gateway}static/PublicationPdfs/${FilePath}`;

    return (
      <React.Fragment>
        <Menu
          onClick={this.handleClickMenu}
          selectedKeys={[this.state.current]}
          mode="horizontal"
          theme="dark"
        >
          <Menu.Item key="NAR">
            <Icon type="file-pdf" />Nucleic Acids Research 2018
          </Menu.Item>
          <Menu.Item key="POL">
            <Icon type="file-pdf" />Polymers 2017
          </Menu.Item>
          <Menu.Item key="PRE">
            <Icon type="file-pdf" />Physical Review E 2016
          </Menu.Item>
        </Menu>
        <br />

        <Card
          title={this.state.Cardtitle}
          style={{width:1000}}
          extra={
            <a
              href={FileLink}
              target="_blank"
              rel="noopener noreferrer"
            >
            <Button
              icon="download"
              size="large"
            >
              Download this Pdf
            </Button>
            </a>
          }
        >
          <Document
            file={file}
            onLoadSuccess={this.onDocumentLoadSuccess}
            renderMode="svg"
          >
            <Page
              width={900}
              pageNumber={pageNumber}
            />
          </Document>
          <br />
          <ButtonGroup>
            <Button
              onClick={this.onPrevPage}
              type="primary"
              disabled={this.DisablePrevPage()}
            >
              <Icon type="left" />
              Prev Page
            </Button>
            <Button
              onClick={this.onNextPage}
              type="primary"
              disabled={this.DisableNextPage()}
            >
              Next Page
              <Icon type="right" />
            </Button>
          </ButtonGroup>
          <p>Page {pageNumber} of {numPages}</p>
        </Card>
      </React.Fragment>
    );
  }
}

export default PdfView;
