import moment from 'moment';
import * as React from 'react';
import SVG from 'react-inlinesvg'
import styles from '../styles/Footer.module.scss'

export default function Footer () {
  return (
    <footer id="footer" className="footer border-t border-independence-900 bg-independence-500">
      <div className="container mx-auto text-center text-white py-4">
        © Copyright {moment().year()}
        <SVG title="Eduardo Chiaro" alt="Eduardo Chiaro" className={`inline-block w-16 mb-2 mx-3 bottomLogo`} src={`/images/logo-n.svg`} />
        Eduardo Chiaro
      </div>
    </footer>
  );
}