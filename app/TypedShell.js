import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Shell = styled.div`
  display: inline-block;
  margin: 18px 0;
  font-family: Consolas, 'Andale Mono WT', 'Andale Mono', 'Lucida Console',
    'Lucida Sans Typewriter', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono',
    'Liberation Mono', 'Nimbus Mono L', Monaco, 'Courier New', Courier,
    monospace;
  border-radius: 5px;
  background: #fff;
  border: 1px solid #eaeaea;
  padding: 12px 18px;
`;

export default class TypedShell extends React.PureComponent {
  static propTypes = {
    children: PropTypes.string.isRequired
  };

  state = {
    lettersToShow: 0
  };

  componentDidMount() {
    this.addLetters();
  }

  addLetters = () => {
    const wait = Math.random() * 200 + 40;

    setTimeout(() => {
      const { children } = this.props;
      const { lettersToShow } = this.state;
      this.setState((s) => ({
        lettersToShow: s.lettersToShow + 1
      }));

      if (lettersToShow < children.length) {
        this.addLetters();
      }
    }, wait);
  };

  render() {
    const { children } = this.props;
    const { lettersToShow } = this.state;
    return <Shell>$ {children.slice(0, lettersToShow)}</Shell>;
  }
}
