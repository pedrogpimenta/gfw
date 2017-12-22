import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/modal';

import Button from 'components/button';
import Icon from 'components/icon/icon';

import googleplusIcon from 'assets/icons/googleplus.svg';
import twitterIcon from 'assets/icons/twitter.svg';
import facebookIcon from 'assets/icons/facebook.svg';

import './share-styles.scss';

class Share extends PureComponent {
  getContent() {
    const {
      haveEmbed,
      selectedType,
      data: { title, url, embedUrl },
      handleFocus,
      changeType,
      copyToClipboard
    } = this.props;

    const subtitle =
      selectedType === 'embed'
        ? 'Click and paste HTML to embed in website.'
        : 'Click and paste link in email or IM';

    const inputValue = selectedType === 'embed' ? embedUrl : url;

    return (
      <div className="c-share">
        <div className="c-share__title">{title}</div>
        <div className="c-share__subtitle">{subtitle}</div>
        <div className="c-share__input-container">
          <input
            ref={input => {
              this.textInput = input;
            }}
            type="text"
            value={inputValue}
            readOnly
            onClick={handleFocus}
            className="c-share__input"
          />
          <button
            className="c-share__input-button"
            onClick={() => copyToClipboard(this.textInput)}
          >
            COPY
          </button>
        </div>
        {haveEmbed ? (
          <div className="c-share__buttons-container">
            <Button
              className={`share-button ${
                selectedType !== 'embed' ? 'theme-button-light-green' : ''
              }`}
              onClick={() => changeType('embed')}
            >
              EMBED
            </Button>
            <Button
              className={`share-button ${
                selectedType === 'embed' ? 'theme-button-light-green' : ''
              }`}
              onClick={() => changeType('link')}
            >
              LINK
            </Button>
          </div>
        ) : null}
        <div className="c-share__social-container">
          <a
            href={`https://plus.google.com/share?url=${url}`}
            target="_blank"
            className="c-share__social-button -googleplus"
          >
            <Icon icon={googleplusIcon} className="googleplus-icon" />
          </a>
          <a
            href={`https://twitter.com/share?url=${url}`}
            target="_blank"
            className="c-share__social-button -twitter"
          >
            <Icon icon={twitterIcon} className="twitter-icon" />
          </a>
          <a
            href={`https://www.facebook.com/sharer.php?u=${url}`}
            target="_blank"
            className="c-share__social-button -facebook"
          >
            <Icon icon={facebookIcon} className="facebook-icon" />
          </a>
        </div>
      </div>
    );
  }

  render() {
    const { isOpen, handleClose } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={handleClose}
        customStyles={{
          overlay: {
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 5px 15px 0 rgba(71, 44, 184, 0.1)',
            backgroundColor: 'rgba(17, 55, 80, 0.4)'
          },
          content: {
            position: 'relative',
            top: 'auto',
            left: 'auto',
            right: 'auto',
            bottom: 'auto',
            width: '300px',
            padding: '0',
            border: 'none',
            borderRadius: 0
          }
        }}
        closeClass="c-share-close"
      >
        {this.getContent()}
      </Modal>
    );
  }
}

Share.propTypes = {
  isOpen: PropTypes.bool,
  haveEmbed: PropTypes.bool,
  selectedType: PropTypes.string,
  data: PropTypes.object,
  handleClose: PropTypes.func,
  handleFocus: PropTypes.func,
  changeType: PropTypes.func,
  copyToClipboard: PropTypes.func
};

export default Share;
