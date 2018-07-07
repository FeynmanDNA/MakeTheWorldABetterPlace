import React from 'react';
import { Alert } from 'antd';

// the calculator does not render the OutputView for IE11 and below

// from stackoverflow:
// https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser/9851769

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;
// for IE11
var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
// true on IE11
// false on Edge and other IEs/browsers.

class DetectBrowser extends React.Component {
  render() {
    if (isIE || isIE11) {
      return (
        <Alert
          message="This calculator does work properly in Internet Explorer browser (IE11 and below)"
          description="Please use a non-IE browser. We have tested for Safari, Edge, Opera, Firefox, Chrome, Brave, and Vivladi."
          type="error"
          showIcon
        />
      );
    } else {
      return (null);
    }
  }
}

export default DetectBrowser;
