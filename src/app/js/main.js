import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import style from '../assets/sass/main.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'chart.js/dist/Chart.min.js';
import Layout from '../components/layout';

const app = document.getElementById('app');

ReactDOM.render(<Layout/>, app);