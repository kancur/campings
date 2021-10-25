import React from 'react';
import { Portal } from 'react-portal';
import ButtonAdmin from './ButtonAdmin';
import OutsideClickHandler from 'react-outside-click-handler';
import FocusLock from 'react-focus-lock';

export default class ConfirmationDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.Yoffset = 0
    this.promiseInfo = {};
  }
  

  show = async () => {
    this.Yoffset = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${this.Yoffset}px`
    document.body.style.left = '0px'
    document.body.style.right = '0px'
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      this.setState({
        show: true,
      });
    });
  };

  hide = () => {
    document.body.setAttribute('style', '')
    window.scrollTo(0, this.Yoffset)
    this.setState({
      show: false,
    });
  };

  render() {
    const { show } = this.state;
    return (
      <>
        {show && (
          <Portal>
            <FocusLock>
            <div id="modalBackdrop" className="fixed top-0 left-0 right-0 bottom-0 backdrop-filter backdrop-blur-sm backdrop-brightness-75 z-50 flex items-center justify-center">
              <OutsideClickHandler
                onOutsideClick={() => {
                  this.hide();
                  this.reject();
                }}
              >
                <div className="bg-white shadow-lg border border-gray-100 p-4 flex flex-col gap-2 rounded-md max-w-lg">
                  <h2 className="text-center text-xl font-semibold">{this.props.confirmationHeading}</h2>
                  <div className="p-1 text-center">{this.props.confirmationMsg}</div>
                  <div className="flex gap-1 justify-center p-1">
                    <ButtonAdmin
                      onClick={() => {
                        this.hide();
                        this.reject();
                      }}
                      className="bg-transparent text-gray-600"
                    >
                      Cancel
                    </ButtonAdmin>
                    <ButtonAdmin
                      className={this.props.actionBtnClassName}
                      onClick={() => {
                        this.hide();
                        this.resolve();
                      }}
                    >
                      {this.props.actionBtnName}
                    </ButtonAdmin>
                  </div>
                </div>
              </OutsideClickHandler>
            </div>
            </FocusLock>
          </Portal>
        )}
      </>
    );
  }

  getResolve() {
    const { resolve = () => {} } = this.promiseInfo || {};
    return (result) => {
      resolve(result);
      this.hide();
    };
  }

  getReject() {
    const { reject = () => {} } = this.promiseInfo || {};
    return (err) => {
      reject(err);
      this.hide();
    };
  }
}
